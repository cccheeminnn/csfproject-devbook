package vttp2022.batch1.csfproject.devbookbackend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class DigitalOceanService {

    @Autowired
    private AmazonS3 s3;

    public boolean saveImageToDOSpaces(String id, MultipartFile imageFile, String fileName) {
        boolean saved = false;

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(imageFile.getContentType());
        metadata.setContentLength(imageFile.getSize());

        try {
            PutObjectRequest putRequest = new PutObjectRequest(
                "bigbook", // spaces name
                "users/%s/%s".formatted(id, fileName),
                imageFile.getInputStream(),
                metadata);
            putRequest.setCannedAcl(CannedAccessControlList.PublicRead);

            s3.putObject(putRequest);

            saved = true;
            return saved;

        } catch (Exception e) {
            return saved;
        }
    }

    public boolean deleteImageFromDOSpaces(String id, String fileName) {
        boolean delete = false;

        try {
            DeleteObjectRequest delRequest = new DeleteObjectRequest(
                "bigbook",
                "users/%s/%s".formatted(id, fileName));

            s3.deleteObject(delRequest);

            delete = true;

            return delete;

        } catch (Exception e) {
            return delete;
        }
    }
}
