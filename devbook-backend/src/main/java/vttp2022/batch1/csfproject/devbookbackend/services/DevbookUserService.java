package vttp2022.batch1.csfproject.devbookbackend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp2022.batch1.csfproject.devbookbackend.models.DevbookUser;
import vttp2022.batch1.csfproject.devbookbackend.repositories.DevbookRepository;

@Service
public class DevbookUserService {
    
    @Autowired
    private DevbookRepository devbookRepository;

    public boolean insertNewUser(DevbookUser user) 
    {
        boolean insert = devbookRepository.insertNewUser(user);

        return insert;
    }
}
