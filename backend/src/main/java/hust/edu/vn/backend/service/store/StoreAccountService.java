package hust.edu.vn.backend.service.store;

import hust.edu.vn.backend.constant.ErrorConstant;
import hust.edu.vn.backend.dto.common.response.Message;
import hust.edu.vn.backend.dto.store.request.DeliveryInfoRequest;
import hust.edu.vn.backend.dto.store.response.DeliveryInfoResponse;
import hust.edu.vn.backend.dto.store.response.DeliveryInfoWithStatus;
import hust.edu.vn.backend.dto.store.response.StoreAccountInfoResponse;
import hust.edu.vn.backend.dto.store.response.StoreDistrictResponse;
import hust.edu.vn.backend.dto.store.response.StoreProvinceResponse;
import hust.edu.vn.backend.entity.AppUser;
import hust.edu.vn.backend.entity.District;
import hust.edu.vn.backend.entity.Province;
import hust.edu.vn.backend.entity.UserDeliverInfo;
import hust.edu.vn.backend.exception.ApiStatusException;
import hust.edu.vn.backend.repository.AppUserRepository;
import hust.edu.vn.backend.repository.DistrictRepository;
import hust.edu.vn.backend.repository.ProvinceRepository;
import hust.edu.vn.backend.repository.UserDeliveryInfoRepository;
import hust.edu.vn.backend.service.dashboard.ImageUploadService;
import hust.edu.vn.backend.utility.ContextUtility;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StoreAccountService {
    private final AppUserRepository appUserRepository;
    private final ProvinceRepository provinceRepository;
    private final DistrictRepository districtRepository;
    private final ImageUploadService imageUploadService;
    private final UserDeliveryInfoRepository userDeliveryInfoRepository;

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

    public List<StoreProvinceResponse> getAllProvinces() {
        List<Province> provinces = provinceRepository.findAll();
        return provinces.stream().map(
                province -> new StoreProvinceResponse()
                        .setId(province.getId())
                        .setNameEn(province.getNameEn())
                        .setNameVi(province.getNameVi())
        ).toList();
    }

    public List<StoreDistrictResponse> getDistrictsByProvinceId(int provinceId) {
        List<District> districts = districtRepository.findDistrictsByProvinceId(provinceId);
        return districts.stream().map(
                district -> new StoreDistrictResponse()
                        .setId(district.getId())
                        .setNameEn(district.getNameEn())
                        .setNameVi(district.getNameVi())
        ).toList();
    }

    public DeliveryInfoWithStatus getDeliveryInfo() {
        UUID userID = ContextUtility.getUserId();
        Optional<DeliveryInfoResponse> data = userDeliveryInfoRepository.findDeliveryInfoByUserId(userID);

        DeliveryInfoWithStatus deliveryInfoWithStatus = new DeliveryInfoWithStatus();
        if (data.isEmpty()){
            deliveryInfoWithStatus.setHasDeliveryInfo(false);
        } else {
            deliveryInfoWithStatus.setHasDeliveryInfo(true);
            deliveryInfoWithStatus.setData(data.get());
        }
        return deliveryInfoWithStatus;
    }

    public Message upsertDeliveryInfo(@Valid DeliveryInfoRequest request) {
        UUID userID = ContextUtility.getUserId();
        Optional<UserDeliverInfo> userDeliverInfo = userDeliveryInfoRepository.findByUserId(userID);
        UserDeliverInfo info;
        if (userDeliverInfo.isPresent()){
            // update
            info = userDeliverInfo.get();
            info.setDeliverName(request.getDeliverName())
                    .setPhoneNumber(request.getPhoneNumber())
                    .setEmail(request.getEmail())
                    .setAddress(request.getAddress())
                    .setPostalCode(request.getPostalCode())
                    .setCountry(request.getCountry());

            District district = districtRepository.findById(request.getDistrictId()).orElseThrow(
                    () -> ApiStatusException.internalServerError(ErrorConstant.ERROR_MESSAGE_DISTRICT_NOT_FOUND, ErrorConstant.ERROR_CODE_DISTRICT_NOT_FOUND)
            );
            info.setDistrictId(district);

        } else {
            // insert
            info = new UserDeliverInfo();
            AppUser user = appUserRepository.findById(userID).orElseThrow(
                    () -> ApiStatusException.internalServerError(ErrorConstant.ERROR_MESSAGE_USER_NOT_FOUND, ErrorConstant.ERROR_CODE_USER_NOT_FOUND)
            );
            info.setUserId(user)
                    .setDeliverName(request.getDeliverName())
                    .setPhoneNumber(request.getPhoneNumber())
                    .setEmail(request.getEmail())
                    .setAddress(request.getAddress())
                    .setPostalCode(request.getPostalCode())
                    .setCountry(request.getCountry());

            District district = districtRepository.findById(request.getDistrictId()).orElseThrow(
                    () -> ApiStatusException.internalServerError(ErrorConstant.ERROR_MESSAGE_DISTRICT_NOT_FOUND, ErrorConstant.ERROR_CODE_DISTRICT_NOT_FOUND)
            );
            info.setDistrictId(district);

        }
        userDeliveryInfoRepository.save(info);

        return new Message("Upsert delivery info successfully", "200");
    }
}
