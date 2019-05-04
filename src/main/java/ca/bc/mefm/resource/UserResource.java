package ca.bc.mefm.resource;

import java.util.List;
import java.util.Date;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.HttpHeaders;

import ca.bc.mefm.data.DataAccess;
import ca.bc.mefm.data.User;
import ca.bc.mefm.security.KeyGenerator;
import ca.bc.mefm.security.TokenGenerator;

import com.googlecode.objectify.Key;

/**
 * Service endpoint for retrieval and creation of User entities 
 * @author Robert
 */
@Path("/users")
public class UserResource extends AbstractResource{

    /**
     * Fetches all User entities
     * @param basicOnly if in the request, and has value "true", only the id and username are returned
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUsers(@QueryParam("basic") String basicOnly){
        DataAccess da = new DataAccess();
        List<User> list = da.getAll(User.class);
        if (basicOnly != null) {
         	return responseOkWithBody(list.stream().map(user -> user.withoutPassword()).toArray());
        }
        else {
        	return responseOkWithBody(da.getAll(User.class));
        }
    }    
    
    /**
     * Creates a new User
     * @param User
     * @return
     */ 	
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response create(User newUser) {
        DataAccess da = new DataAccess();
        // Check if username already taken
    	User existingUser = da.findByQuery(User.class, "username", newUser.getUsername());
    	if (existingUser != null) {
    		return responseOkWithBody(new AuthResultNameAlreadyTaken());
    	}
    	newUser.setStatus(User.Status.ENABLED);
        newUser.setCreated(new Date());
        da.put(newUser);

		String token = TokenGenerator.generateToken(newUser.getUsername(), newUser.getRole().toString(), newUser.getId());
	    return responseCreated(newUser.getId(), token);

        
//        return responseCreated(newUser.getId());
    }
    
    /**
     * Authenticates a user and generates a JSON Web Token
     * @param User
     * 
     */
    @POST
    @Path("auth")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response authenticate(User credentials) {
        DataAccess da = new DataAccess();
    	User user = da.findByQuery(User.class, "username", credentials.getUsername());
//    	if (user == null) {
//    		return responseOkWithBody(new AuthResultBadUser());
//    	}
//    	if (!user.getPassword().equals(credentials.getPassword())) {
//    		return responseOkWithBody(new AuthResultWrongPassword());
//    	}
//    	return responseOkWithBody(user);
    	if (user == null || !user.getPassword().equals(credentials.getPassword())) {
    		return Response.status(Response.Status.UNAUTHORIZED).build();
    	}
    	else {
    		String token = TokenGenerator.generateToken(user.getUsername(), user.getRole().toString(), user.getId());
    	    return responseOkWithBody(token);
    	}
    }
    
    
    /**
     * Fetches a specific User
     * @param id
     * @return
     */
	@Path("{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response get(@PathParam("id") Long id){
        DataAccess da = new DataAccess();
        Key<User> key = Key.create(User.class, id);
        User user = da.find(key);
        return responseOkWithBody(user);
    }
	
	public class AuthResultBadUser {
		private boolean userNotFound = true;
		public boolean getUserNotFound() {
			return userNotFound;
		}
	}
	public class AuthResultWrongPassword {
		private boolean invalidPassword = true;
		public boolean getInvalidPassword() {
			return invalidPassword;
		}
	}
	public class AuthResultNameAlreadyTaken {
		private boolean nameAlreadyTaken = true;
		public boolean getNameAlreadyTaken() {
			return nameAlreadyTaken;
		}
	}
}
