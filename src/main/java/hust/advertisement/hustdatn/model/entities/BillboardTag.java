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

import java.util.UUID;

@Entity
@Table(name = "BillboardTags", schema = "public")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillboardTag {
	@Id
	@GeneratedValue
	private UUID id;
	
	@Column(nullable = false, length = 256)
	private String tag;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "billboard_id", nullable = false)
	private Billboard billboard;
}
