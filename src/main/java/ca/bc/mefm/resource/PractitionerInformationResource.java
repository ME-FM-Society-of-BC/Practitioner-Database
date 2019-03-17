package ca.bc.mefm.resource;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import ca.bc.mefm.data.DataAccess;
import ca.bc.mefm.data.Practitioner;

import com.googlecode.objectify.Key;

/**
 * Service endpoint for Practitioner entity creation, modification and retrieval
 * @author Robert
 */
@Path("/practitioners")
public class PractitionerInformationResource extends AbstractResource{

	static {
		AbstractResource.setCreatePath("practitioners");
	}
	
	/**
	 * Fetches all Practitioner entities
	 * @return
	 */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(){
    	DataAccess da = new DataAccess();
    	List<Practitioner> list = da.getAll(Practitioner.class);
    	return responseOkWithBody(list);
    }
    
    /**
     * Fetches a specific Practitioner
     * @param id
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response get(@PathParam("id") Long id){
    	DataAccess da = new DataAccess();
    	Key<Practitioner> key = Key.create(Practitioner.class, id);
    	Practitioner practitioner = da.ofyFind(key);
    	return responseOkWithBody(practitioner);
    }
    
    /**
     * Creates a new Practitioner
     * @param practitioner
     * @return
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response create(Practitioner practitioner) {
    	DataAccess da = new DataAccess();
    	da.ofyPut(practitioner);
    	return responseCreated(practitioner.getId());
    }

    /**
     * Updates a new Practitioner
     * @param practitioner
     * @return
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response update(@PathParam("id") Long id, Practitioner practitioner) {
    	DataAccess da = new DataAccess();
    	da.ofyPut(practitioner);
    	return responseNoContent();
    }
}
