package ca.bc.mefm.resource;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import ca.bc.mefm.data.City;
import ca.bc.mefm.data.DataAccess;

/**
 * Service endpoint for City entity retrieval. 
 * @author Robert
 */
@Path("/cities")
public class CityResource extends AbstractResource  {
    /**
     * Fetches all City entities
     * @return list of Cities
     */
	@GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCities(){
        DataAccess da = new DataAccess();
        List<City> list = da.getAll(City.class);
        return responseOkWithBody(list);
    }

}
