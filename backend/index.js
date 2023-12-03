const express = require("express");
const app = express();
const port = 5000;
const config = require("./config/key");
const cors = require("cors");
const router = express.Router();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB 연결됨..."))
  .catch((err) => console.log(err));

const searchRoutes = require("./routes/searchRoutes");
app.use("/api/search", searchRoutes);

const reviewRoutes = require("./routes/reviewRoutes");
app.use("/api/review", reviewRoutes);

const { User } = require("./models/User");
const { UserCategory } = require("./models/UserCategory");
const { Bookmark } = require("./models/Bookmark");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const { auth } = require("./middleware/auth");
const { Comment } = require("./models/Comment");
const Reply = require("./models/Reply");

app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/axios", (req, res) => {
  res.send("AXIOS testing success");
});

app.post("/api/users/register", (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const user = new User({ email, password, confirmPassword });
  user.save()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "사용자 등록 성공",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
        error: err,
      });
    });
});

app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다.",
        });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다.",
          });
        }
        user.generateToken((err, user) => {
          if (err) {
            return res.status(400).send(err);
          }
          res.cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, _id: user._id });
        });
      });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    nickname: req.user.nickname,
    password: req.user.password,
    profile_image: req.user.profile_image,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
    .then(() => {
      res.status(200).send({
        success: true,
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

app.post("/api/users/reset_password", auth, (req, res) => {
  const { password, newPW1, newPW2 } = req.body;

  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        return res.json({
          findSuccess: false,
          message: "현재 유저 정보가 일치하지 않습니다.",
        });
      }

      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            compareSuccess: false,
            message: "현재 유저 정보가 일치하지 않습니다.",
          });
        }

        if (password !== newPW1) {
          if (newPW1.length >= 8) {
            if (newPW1 === newPW2) {
              user.generateHash(newPW2, (err, hash) => {
                if (!hash) {
                  return res.json({
                    hashSuccess: false,
                    message: "hash가 생성되지 않았습니다.",
                  });
                }
                User.findOneAndUpdate(
                  { _id: req.user._id },
                  { password: hash }
                )
                  .then(() => {
                    res.status(200).json({
                      hashSuccess: true,
                      message: "비밀번호 변경 성공",
                    });
                  })
                  .catch((err) => {
                    res.json({
                      hashSuccess: false,
                      message: "비밀번호 변경 실패",
                      error: err,
                    });
                  });
              });
            } else {
              return res.json({
                ifSuccess: false,
                message: "pw1과 pw2이 다릅니다",
              });
            }
          } else {
            return res.json({
              ifSuccess: false,
              message: "8보다 크게 설정해주세요",
            });
          }
        } else {
          return res.json({
            ifSuccess: false,
            message: "새 비밀번호가 현재 비밀번호와 같으면 안됩니다",
          });
        }
      });
    })
    .catch((err) => {
      return res.status(400).json({
        findSuccess: false,
        message: "User 접근에 실패했습니다.",
        error: err,
      });
    });
});

app.post("/api/users/reset_nickname", auth, (req, res) => {
  const newNickname = req.body.nickname;

  User.findOne({ nickname: newNickname })
    .then((existingUser) => {
      if (existingUser) {
        return res.json({
          success: false,
          message: "이미 있는 nickname입니다.",
        });
      }

      User.findOneAndUpdate(
        { _id: req.user._id },
        { nickname: newNickname },
        { new: true }
      )
        .then((updatedUser) => {
          if (!updatedUser) {
            return res.json({
              success: false,
              message: "닉네임 변경 실패",
            });
          }
          res.status(200).json({
            success: true,
            message: "닉네임 변경 성공",
          });
        })
        .catch((err) => {
          res.json({
            success: false,
            message: "닉네임 변경 실패",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.json({
        findSuccess: false,
        message: "User 접근에 실패했습니다.",
        error: err,
      });
    });
});

app.post("/api/users/select_category", auth, (req, res) => {
  const { userId, categoryId } = req.body;

  const userCategory = new UserCategory({
    userId: userId,
    categoryId: categoryId,
  });

  userCategory
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Category selected successfully.",
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    });
});

app.post("/api/users/deselect_category", auth, (req, res) => {
  const { userId, categoryId } = req.body;

  UserCategory.findOneAndDelete({ userId: userId, categoryId: categoryId })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Category deselected successfully.",
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    });
});

app.post("/api/users/select_bookmark", auth, (req, res) => {
  const { userId, reviewId } = req.body;

  const bookmark = new Bookmark({
    userId: userId,
    reviewId: reviewId,
  });

  bookmark
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Bookmark selected successfully.",
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    });
});

app.post("/api/users/deselect_bookmark", auth, (req, res) => {
  const { userId, reviewId } = req.body;

  Bookmark.findOneAndDelete({ userId: userId, reviewId: reviewId })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Bookmark deselected successfully.",
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    });
});

app.post("/api/comments", (req, res) => {
    const { username, content } = req.body;

    const newComment = new Comment({
        author: username,
        content,
        timestamp: new Date().toISOString(),
    });

    newComment
        .save()
        .then((comment) => {
            res.json({ success: true, comment, message: "댓글이 성공적으로 등록되었습니다." });
        })
        .catch((error) => {
            console.error("댓글 저장 중 오류 발생:", error);
            res.status(500).json({ success: false, message: "내부 서버 오류." });
        });
});

router.post("/api/comments/:commentId/replies", async (req, res) => {
    try {
        const { commentId } = req.params;
        const { author, content } = req.body;

        const newComment = new Comment({
            author,
            content,
            timestamp: new Date().toISOString(),
        });

        const savedComment = await newComment.save();

        const newReply = new Reply({
            commentId: savedComment._id,
            author,
            content,
            timestamp: new Date().toISOString(),
        });

        const savedReply = await newReply.save();

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { $push: { replies: savedReply._id } },
            { new: true }
        ).exec();

        res.json({ success: true, comment: updatedComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "내부 서버 오류." });
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
