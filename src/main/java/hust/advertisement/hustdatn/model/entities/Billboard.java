package hust.advertisement.hustdatn.model.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "Billboards", schema = "public")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Billboard {
	@Id
	@Column(name = "Id")
	private UUID id;
	
	@Column(name = "TenantId")
	private UUID tenantId;
	
	@Column(name = "Name", length = 128, nullable = false)
	private String name;
	
	@Column(name = "Description", length = 512)
	private String description;
	
	@Column(name = "Code", columnDefinition = "text")
	private String code;
	
	@Column(name = "Type", nullable = false)
	private Integer type;
	
	@Column(name = "Dimension_Width")
	private Integer dimensionWidth;
	
	@Column(name = "Dimension_Height")
	private Integer dimensionHeight;
	
	@Column(name = "Dimension_Inches")
	private Integer dimensionInches;
	
	@Column(name = "Address_Province", length = 256)
	private String addressProvince;
	
	@Column(name = "Address_District", length = 256)
	private String addressDistrict;
	
	@Column(name = "Address_Ward", length = 256)
	private String addressWard;
	
	@Column(name = "Address_Type", length = 256)
	private String addressType;
	
	@Column(name = "Address_Description", length = 512)
	private String addressDescription;
	
	@Column(name = "Address_Category")
	private Integer addressCategory;
	
	@Column(name = "Status", nullable = false)
	private Integer status;
	
	@Column(name = "IsLinked", nullable = false)
	private Boolean isLinked;
	
	@Column(name = "LinkedUserId")
	private UUID linkedUserId;
	
	@Column(name = "IsConnected", nullable = false)
	private Boolean isConnected;
	
	@Column(name = "Phone", length = 36)
	private String phone;
	
	@Column(name = "Email", length = 256)
	private String email;
	
	@Column(name = "ExtraProperties", columnDefinition = "text")
	private String extraProperties;
	
	@Column(name = "ConcurrencyStamp", length = 40)
	private String concurrencyStamp;
	
	@CreationTimestamp
	@Column(name = "CreationTime", nullable = false)
	private LocalDateTime creationTime;
	
	@Column(name = "CreatorId")
	private UUID creatorId;
	
	@UpdateTimestamp
	@Column(name = "LastModificationTime")
	private LocalDateTime lastModificationTime;
	
	@Column(name = "LastModifierId")
	private UUID lastModifierId;
	
	@Column(name = "IsDeleted", columnDefinition = "boolean default false")
	private Boolean isDeleted = false;
	
	@Column(name = "DeleterId")
	private UUID deleterId;
	
	@Column(name = "DeletionTime")
	private LocalDateTime deletionTime;
	
	@OneToMany(mappedBy = "billboard", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<BillboardResource> resources;
	
	@OneToMany(mappedBy = "billboard", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<BillboardTag> tags;
	
	@OneToMany(mappedBy = "billboard")
	private List<Schedule> schedules;
}
