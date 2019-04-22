package ca.bc.mefm.data;

import java.util.Date;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

import lombok.Data;

@Entity
@Data
public class RecommendationAction {
	
	public enum 	ActionType {CREATE, EDIT, RATE}

	@Id
	private Long	id;
	@Index 
	private Long		practitionerId;
	@Index 
	private Long		userId;
	private Long		questionId;
	private ActionType	actionType;
	private Integer		value;
	private Date		date;

	public RecommendationAction() {}
}
