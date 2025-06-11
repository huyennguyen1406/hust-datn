package hust.advertisement.hustdatn.model.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "Schedules", schema = "public")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Schedule {
	@Id
	@Column(name = "Id")
	private UUID id;
	
	@Column(name = "TenantId")
	private UUID tenantId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CampaignId", nullable = false)
	private Campaign campaign;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "BillboardId", nullable = false)
	private Billboard billboard;
	
	@Column(name = "StartTime", nullable = false)
	private LocalDateTime startTime;
	
	@Column(name = "EndTime", nullable = false)
	private LocalDateTime endTime;
	
	@Column(name = "DisplayDay", nullable = false)
	private Integer displayDay;
	
	@Column(name = "CampaignAmount", nullable = false)
	private Integer campaignAmount;
	
	@Column(name = "Status", nullable = false)
	private Integer status;
}
