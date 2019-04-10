package ca.bc.mefm.resource;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import ca.bc.mefm.data.DataAccess;
import ca.bc.mefm.data.User;

import com.googlecode.objectify.Key;

/**
 * Service endpoint for retrieval and creation of USer entities 
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
    public Response create(User user) {
        DataAccess da = new DataAccess();
        da.ofyPut(user);
        return responseCreated(user.getId());
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
        User user = da.ofyFind(key);
        return responseOkWithBody(user);
    }
}
