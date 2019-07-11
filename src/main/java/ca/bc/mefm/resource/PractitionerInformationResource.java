package ca.bc.mefm.resource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import ca.bc.mefm.data.DataAccess;
import ca.bc.mefm.data.Practitioner;
import ca.bc.mefm.data.RecommendationAction;
import ca.bc.mefm.data.DataAccess.Filter;

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
	 * Fetches all Practitioner entities matching the given criteria
	 * @return
	 */
    @Path("search")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response search(@QueryParam("criteria") String criteria){
    	
    	List<String> items = Arrays.asList(criteria.split("\\|"));
    	
        List<DataAccess.Filter> filters = new ArrayList<DataAccess.Filter>();
        
        items.stream().forEach( item -> {
        	String p[] = item.split("=");
        	if (p[0].endsWith("Id")) {
        		filters.add(new Filter(p[0], Long.valueOf(p[1])));
        	}
        	else {
        		// For string fields
            	filters.add(new Filter(p[0], p[1]));        		
        	}
        });
        
    	DataAccess da = new DataAccess();
        List<Practitioner> list = da.getAllByFilters(Practitioner.class, filters.toArray(new DataAccess.Filter[] {}));
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
		Practitioner practitioner = da.find(Long.valueOf(id), Practitioner.class);
    	return responseOkWithBody(practitioner);
    }
    
    /**
     * Creates a new Practitioner
     * @param practitioner
     * @return
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response create(Practitioner practitioner, @QueryParam("userId") Long userId) {
    	DataAccess da = new DataAccess();
    	da.put(practitioner);
    	
    	// Record the action
        RecommendationAction action = new RecommendationAction(
        		userId,
        		practitioner.getId(),
        		practitioner.getCreationDate(),
        		RecommendationAction.ActionType.CREATE
        		);
        da.put(action);
    	
    	return responseCreated(practitioner.getId());
    }

    /**
     * Updates a Practitioner
     * @param practitioner
     * @return
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response update(@PathParam("id") Long id, Practitioner practitioner, @QueryParam("userId") Long userId) {
    	DataAccess da = new DataAccess();
    	da.put(practitioner);

    	// Record the action
        RecommendationAction action = new RecommendationAction(
        		userId,
        		practitioner.getId(),
        		practitioner.getEditDate(),
        		RecommendationAction.ActionType.EDIT
        		);
        da.put(action);

        return responseNoContent();
    }
}
