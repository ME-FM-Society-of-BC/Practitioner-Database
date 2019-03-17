package ca.bc.mefm.data;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
public class Specialty {
	@Id
	private Long	id;
	private String	text;
	
	public Specialty() {}
}
