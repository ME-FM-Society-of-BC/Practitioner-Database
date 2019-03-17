package ca.bc.mefm.data;

import java.util.Date;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

import lombok.Data;

@Entity
@Data
public class Comment {
	
	public enum Status {APPROVED, PENDING};
	
	@Id
	private Long	id;
	@Index 
	private Long	parentId;	
	@Index 
	private Long	userId;
	@Index 
	private Long	practitionerId;
	private Date	date;
	private String	text;
	private Status	status;
	
	public Comment() {}
}
