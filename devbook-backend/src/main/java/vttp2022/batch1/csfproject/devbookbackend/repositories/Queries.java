package vttp2022.batch1.csfproject.devbookbackend.repositories;

public class Queries {

    // user_credentials queries
    public final static String SQL_RETRIEVE_USER_DETAILS_ID = "select user_id, user_name, user_email, employer from user_credentials where user_id = ?";
    public final static String SQL_RETRIEVE_USER_DETAILS_EMAIL = "select user_id, user_name, user_email, employer from user_credentials where user_email = ?";

    public final static String SQL_RETRIEVE_USER_NAME = "select user_name from user_credentials where user_email = ?";

    public final static String SQL_VERIFY_USER_EMAIL = "update user_credentials set verified = true where user_id = ?";

    // retrieve ALL users
    public final static String SQL_RETRIEVE_LIST_OF_USERS = "select user_id, user_name, user_email from user_credentials where employer = false limit ? offset ? ";
    public final static String SQL_RETRIEVE_COUNT_OF_USERS = "select count(*) from user_credentials where employer = false";

    // retrieve FILTERED users
    public final static String SQL_RETRIEVE_LIST_OF_FILTERED_USERS = "select user_id, user_name, user_email from user_credentials where user_name like ? and employer = false limit ? offset ?";
    public final static String SQL_RETRIEVE_COUNT_OF_FILTERED_USERS = "select count(*) from user_credentials where user_name like ? and employer = false";

    public final static String SQL_CHECK_USER_EXIST = "select * from user_credentials where user_email = ?";

    public final static String SQL_CHECK_USER_LOGINS = "select * from user_credentials where user_email = ? and user_password = ?";

    public final static String SQL_INSERT_NEW_USER_CREDENTIALS = "insert into user_credentials values (?,?,?,?,?,?)"; // id, name, pw, email, verified, employer

    // user_images queries
    public final static String SQL_RETRIEVE_USER_IMAGES = "select * from user_images where user_email = ?";

    public final static String SQL_CHECK_USER_IMAGE_EXIST = "select * from user_images where user_email = ? and image_name = ?";

    public final static String SQL_INSERT_USER_IMAGES = "insert into user_images (user_email, image_name, image_description) values (?,?,?)";

    public final static String SQL_UPDATE_USER_IMAGES = "update user_images set image_description = ? where user_email = ? and image_name = ?";

    public final static String SQL_DELETE_USER_IMAGE = "delete from user_images where user_email = ? and image_name = ?";

    // user_occupation queries
    public final static String SQL_RETRIEVE_USER_OCCUPATION = "select * from user_occupation where user_email = ?";

    public final static String SQL_INSERT_USER_OCCUPATION = "insert into user_occupation values (?,?,?,?,?,?)";

    public final static String SQL_UPDATE_USER_OCCUPATION =
        "update user_occupation set current_occupation = ?, current_company = ?, previous_company = ?, education_certification = ? where user_email = ?";

    public final static String SQL_UPDATE_USER_BIO = "update user_occupation set user_bio = ? where user_email = ?";

    // user_skills queries
    public final static String SQL_RETRIEVE_USER_SKILLS = "select * from user_skills where user_email = ?";

    public final static String SQL_INSERT_USER_SKILLS = "insert into user_skills (user_email, skill_name, skill_rating) values (?,?,?)";

    public final static String SQL_DELETE_USER_SKILLS = "delete from user_skills where user_email = ?";

    // user_websites queries
    public final static String SQL_RETRIEVE_USER_WEBSITES = "select * from user_websites where user_email = ?";

    public final static String SQL_INSERT_USER_WEBSITES = "insert into user_websites (user_email, website_name, website_url) values (?,?,?)";

    public final static String SQL_DELETE_USER_WEBSITES = "delete from user_websites where user_email = ?";

    // user_comments queries
    public final static String SQL_RETRIEVE_USER_COMMENTS = "select comment_id, comment_name, comment_text from user_comments where user_email = ?";

    public final static String SQL_INSERT_USER_COMMENTS = "insert into user_comments (user_email, comment_id, comment_name, comment_text) values (?,?,?,?)";

    // user_likes_ratings queries
    public final static String SQL_INSERT_USER_LIKES_RATINGS = "insert into user_likes_ratings values (?,?,?)";
    public final static String SQL_RETRIEVE_USER_LIKES_RATINGS = "select * from user_likes_ratings where user_email = ?";

    public final static String SQL_UPDATE_USER_LIKES = "update user_likes_ratings set user_likes = ? where user_email = ?";

    public final static String SQL_UPDATE_USER_RATINGS = "update user_likes_ratings set user_ratings = ? where user_email = ?";

    // user_received_likes queries
    public final static String SQL_INSERT_USER_RECEIVED_LIKES_FROM = // who has given this user a like?
            "insert into user_received_likes (user_email, liked_user) values (?,?)";
    public final static String SQL_DELETE_USER_RECEIVED_LIKES_FROM = // who has given this user a like?
            "delete from user_received_likes where user_email = ? and liked_user = ?";
    public final static String SQL_RETRIEVE_USER_RECEIVED_LIKES_FROM = // who has given this user a like?
            "select user_email, liked_user from user_received_likes where user_email = ?";

    // user_received_ratings
    public final static String SQL_INSERT_USER_RECEIVED_RATINGS_FROM = "insert into user_received_ratings (user_email, rated_user, ratings) values (?,?,?)";
    public final static String SQL_UPDATE_USER_RECEIVED_RATINGS_FROM = "update user_received_ratings set ratings = ? where user_email = ? and rated_user = ?";

    public final static String SQL_RETRIEVE_USER_RECEIVED_RATINGS_FROM = // who has given this user a rating?
            "select user_email, rated_user, ratings from user_received_ratings where user_email = ?";

    // user_notifications
    public final static String SQL_INSERT_USER_NOTIFICATIONS =
        "insert into user_notifications (user_email, notification_email, notification_name, notification_content, notification_status) value (?,?,?,?,?)";

    public final static String SQL_UPDATE_USER_NOTIFICATIONS_STATUS =
        "update user_notifications set notification_status = 'OLD' where user_email = ?";

    public final static String SQL_RETRIEVE_USER_NOTIFICATIONS =
        "select * from user_notifications where user_email = ? order by date_time desc";

    public final static String SQL_RETRIEVE_USER_NOTIFICATIONS_TOTAL_COUNT =
        "select count(*) from user_notifications where user_email = ?";

    public final static String SQL_DELETE_OLDEST_NOTIFICATION =
        "delete from user_notifications where user_email = ? order by date_time asc limit 1";

    public final static String SQL_RETRIEVE_USER_NEW_NOTIFICATIONS_COUNT =
        "select count(*) from user_notifications where user_email = ? and notification_status = 'NEW'";
}
