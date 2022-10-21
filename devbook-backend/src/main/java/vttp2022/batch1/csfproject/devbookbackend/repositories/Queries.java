package vttp2022.batch1.csfproject.devbookbackend.repositories;

public class Queries {

    // user_credentials queries
    public final static String SQL_RETRIEVE_USER_DETAILS_ID =
        "select user_id, user_name, user_email from user_credentials where user_id = ?";
    public final static String SQL_RETRIEVE_USER_DETAILS_EMAIL =
        "select user_id, user_name, user_email from user_credentials where user_email = ?";

    // retrieve ALL users
    public final static String SQL_RETRIEVE_LIST_OF_USERS =
        "select user_id, user_name, user_email from user_credentials limit ? offset ?";
    public final static String SQL_RETRIEVE_COUNT_OF_USERS =
        "select count(*) from user_credentials";
        
    // retrieve FILTERED users
    public final static String SQL_RETRIEVE_LIST_OF_FILTERED_USERS =
        "select user_id, user_name, user_email from user_credentials where user_name like ? limit ? offset ?";
    public final static String SQL_RETRIEVE_COUNT_OF_FILTERED_USERS =
        "select count(*) from user_credentials where user_name like ?";

    public final static String SQL_CHECK_USER_EXIST =
        "select * from user_credentials where user_email = ?";

    public final static String SQL_CHECK_USER_LOGINS =
        "select * from user_credentials where user_email = ? and user_password = ?";

    public final static String SQL_INSERT_NEW_USER_CREDENTIALS =
        "insert into user_credentials values (?,?,?,?,?)"; // id, name, pw, email, verified

    // user_images queries
    public final static String SQL_RETRIEVE_USER_IMAGES =
        "select * from user_images where user_email = ?";

    public final static String SQL_INSERT_USER_IMAGES =
        "insert into user_images (user_email, image_name, image_description) values (?,?,?)";

    // user_occupation queries
    public final static String SQL_RETRIEVE_USER_OCCUPATION =
        "select * from user_occupation where user_email = ?";

    public final static String SQL_INSERT_USER_OCCUPATION =
        "insert into user_occupation values (?,?,?,?,?,?)";

    // user_skills queries
    public final static String SQL_RETRIEVE_USER_SKILLS =
        "select * from user_skills where user_email = ?";

    public final static String SQL_INSERT_USER_SKILLS =
        "insert into user_skills (user_email, skill_name, skill_rating) values (?,?,?)";

    // user_websites queries
    public final static String SQL_RETRIEVE_USER_WEBSITES =
        "select * from user_websites where user_email = ?";

    public final static String SQL_INSERT_USER_WEBSITES =
        "insert into user_websites (user_email, website_name, website_url) values (?,?,?)";

    // user_comments queries
    public final static String SQL_RETRIEVE_USER_COMMENTS =
        "select comment_id, comment_name, comment_text from user_comments where user_email = ?";

    public final static String SQL_INSERT_USER_COMMENTS =
        "insert into user_comments (user_email, comment_id, comment_name, comment_text) values (?,?,?,?)";

    // user_likes_ratings queries
    public final static String SQL_INSERT_USER_LIKES_RATINGS = 
        "insert into user_likes_ratings values (?,?,?)";
    public final static String SQL_RETRIEVE_USER_LIKES_RATINGS =
        "select * from user_likes_ratings where user_email = ?";

    public final static String SQL_UPDATE_USER_LIKES =
        "update user_likes_ratings set user_likes = ? where user_email = ?";

    public final static String SQL_UPDATE_USER_RATINGS =
        "update user_likes_ratings set user_ratings = ? where user_email = ?";

    // user_received_likes queries
    public final static String SQL_INSERT_USER_RECEIVED_LIKES_FROM = // who has given this user a like?
        "insert into user_received_likes (user_email, liked_user) values (?,?)";
    public final static String SQL_DELETE_USER_RECEIVED_LIKES_FROM = // who has given this user a like?
        "delete from user_received_likes where user_email = ? and liked_user = ?";
    public final static String SQL_RETRIEVE_USER_RECEIVED_LIKES_FROM = // who has given this user a like?
        "select user_email, liked_user from user_received_likes where user_email = ?";

    // user_received_ratings
    public final static String SQL_INSERT_USER_RECEIVED_RATINGS_FROM =
        "insert into user_received_ratings (user_email, rated_user, ratings) values (?,?,?)";
    public final static String SQL_UPDATE_USER_RECEIVED_RATINGS_FROM =
        "update user_received_ratings set ratings = ? where user_email = ? and rated_user = ?";

    public final static String SQL_RETRIEVE_USER_RECEIVED_RATINGS_FROM = // who has given this user a rating?
        "select user_email, rated_user, ratings from user_received_ratings where user_email = ?";
}
