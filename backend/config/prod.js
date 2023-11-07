module.exports = {
    // https://www.heroku.com/에서 mongoURI로 설정한 uri를 가져옴
    // 일단 강의에서 들은대로 해 둠 (heroku할거면 파야함) https://izy.codes/heroku-deploy-static-html/
    mongoURI: process.env.MONGO_URI
}