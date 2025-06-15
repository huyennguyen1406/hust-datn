package hust.advertisement.hustdatn.model.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
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
	@GeneratedValue
	private UUID id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "campaign_id", nullable = false)
	private Campaign campaign;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "billboard_id", nullable = false)
	private Billboard billboard;
	
	@Column(name = "start_time", nullable = false)
	private LocalDateTime startTime;
	
	@Column(name = "end_time", nullable = false)
	private LocalDateTime endTime;
	
	@Column(name = "display_day", nullable = false)
	private Integer displayDay;
	
	@Column(name = "campaign_amount", nullable = false)
	private Integer campaignAmount;
	
	@Column(nullable = false)
	private Integer status;
}
