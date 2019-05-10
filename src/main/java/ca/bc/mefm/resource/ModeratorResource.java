package ca.bc.mefm.resource;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import ca.bc.mefm.data.DataAccess;
import ca.bc.mefm.data.Moderator;

/**
 * Service endpoint for Comment entity creation and retrieval
 * @author Robert
 */
@Path("/moderators")
public class ModeratorResource extends AbstractResource{

    /**
     * Fetches all Moderator entities
     * @return list of Moderators
     */
	@GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(){
        DataAccess da = new DataAccess();
        List<Moderator> list = da.getAll(Moderator.class);
        return responseOkWithBody(list);
    }

    /**
     * Creates a new Moderator
     * @param Comment
     * @return
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response create(Moderator moderator) {    	
        DataAccess da = new DataAccess();
        da.put(moderator);
        return responseCreated(moderator.getId());
    }
}
