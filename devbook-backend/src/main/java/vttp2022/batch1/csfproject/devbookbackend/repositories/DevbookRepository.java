package vttp2022.batch1.csfproject.devbookbackend.repositories;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import vttp2022.batch1.csfproject.devbookbackend.models.DevbookUser;
import static vttp2022.batch1.csfproject.devbookbackend.repositories.Queries.*;

@Repository
public class DevbookRepository {

    @Autowired
    private JdbcTemplate template;

    public Optional<DevbookUser> checkUserExist(String email)
    {
        SqlRowSet rs = template.queryForRowSet(SQL_CHECK_USER_EXIST, email);
        if (rs.next()) {
            DevbookUser user = DevbookUser.createFromRowSet(rs);
            return Optional.of(user);
        } else {
            return Optional.empty();
        }
    }

    public boolean checkUserLogins(String email, String password)
    {
        SqlRowSet rs = template.queryForRowSet(SQL_CHECK_USER_LOGINS, email, password);
        boolean exist = false;
        if (rs.next()) {
            exist = true;
        }
        return exist;
    }

    public boolean insertNewUser(DevbookUser user)
    {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        int insert = template.update(SQL_INSERT_NEW_USER,
            user.getUsername(),
            bCryptPasswordEncoder.encode(user.getPassword()),
            user.getEmail());

        if (insert == 1)
            return true;

        return false;
    }
}
