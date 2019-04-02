package ca.bc.mefm.data;

import java.util.Date;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
public class Practitioner {
	
	@Id
	private Long	id;
	private String 	lastName;
	private String 	firstName;
	private String 	address;
	private String 	city;
	private String  province;
	private String 	country;
	private String 	postalCode;
	private String 	phone;
	private String	website;
	private Long 	specialtyId;
	private Date	creationDate;
	private Date	editDate;

	public Practitioner() {}
	
}
