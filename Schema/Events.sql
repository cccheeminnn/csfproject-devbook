CREATE EVENT
  ClearUnverifiedUsers
ON SCHEDULE EVERY 2 DAY
DO
DELETE FROM
  user_credentials
WHERE verified = false;

show events from devbook;

drop event ClearUnverifiedUsers;