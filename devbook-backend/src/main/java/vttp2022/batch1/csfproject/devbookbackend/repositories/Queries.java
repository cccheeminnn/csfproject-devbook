package vttp2022.batch1.csfproject.devbookbackend.repositories;

public class Queries {

    public final static String SQL_CHECK_USER_EXIST =
    "select * from users where user_email = ?";

    public final static String SQL_CHECK_USER_LOGINS =
        "select * from users where user_email = ? and user_password = ?";

    public final static String SQL_INSERT_NEW_USER =
        "insert into users values (?, ?, ?)"; // name, pw, email

}
