// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into user(id, name, age) values (0, ?, ?)'
    }
}

module.exports = sqlMap;

// 作者：wangxiaoda
// 链接：http://www.jianshu.com/p/6b2bf63bb00e
// 來源：简书
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。