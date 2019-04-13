package ca.bc.mefm.data;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
public class UserRole {
	public static final String TYPE_ACTIVE = "Active";
	public static final String TYPE_ADMINISTRATOR = "Administrator";
	public static final String TYPE_SUPPORT= "Support";
	
	@Id
	private Long	id;
	private String	type;
	
	public UserRole() {}
}
