package hust.edu.vn.backend.service.store;

import hust.edu.vn.backend.constant.ErrorConstant;
import hust.edu.vn.backend.dto.store.response.StoreAccountInfoResponse;
import hust.edu.vn.backend.entity.AppUser;
import hust.edu.vn.backend.exception.ApiStatusException;
import hust.edu.vn.backend.repository.AppUserRepository;
import hust.edu.vn.backend.service.dashboard.ImageUploadService;
import hust.edu.vn.backend.utility.ContextUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StoreAccountService {
    private final AppUserRepository appUserRepository;
    private final ImageUploadService imageUploadService;

    public StoreAccountInfoResponse getAccountInfo() {
        UUID userID = ContextUtility.getUserId();
        AppUser user = appUserRepository.findById(userID).orElseThrow(
                () -> ApiStatusException.internalServerError(ErrorConstant.ERROR_MESSAGE_USER_NOT_FOUND, ErrorConstant.ERROR_CODE_USER_NOT_FOUND)
        );

        return new StoreAccountInfoResponse()
                .setImageLink(user.getImageLink())
                .setEmail(user.getEmail())
                .setFirstName(user.getFirstName()).setLastName(user.getLastName())
                .setPhoneNumber(user.getPhoneNumber());
    }

    public StoreAccountInfoResponse postAccountInfo(String firstName, String lastName, MultipartFile avatar) {
        UUID userID = ContextUtility.getUserId();
        AppUser user = appUserRepository.findById(userID).orElseThrow(
                () -> ApiStatusException.internalServerError(ErrorConstant.ERROR_MESSAGE_USER_NOT_FOUND, ErrorConstant.ERROR_CODE_USER_NOT_FOUND)
        );

        if (!Objects.isNull(avatar) && !avatar.isEmpty() ) {
            String imageLink = imageUploadService.upload(avatar);
            user.setImageLink(imageLink);
        }

        user.setFirstName(firstName)
                .setLastName(lastName);

        appUserRepository.save(user);

        return new StoreAccountInfoResponse()
                .setImageLink(user.getImageLink())
                .setEmail(user.getEmail())
                .setFirstName(user.getFirstName()).setLastName(user.getLastName())
                .setPhoneNumber(user.getPhoneNumber());
    }
}
