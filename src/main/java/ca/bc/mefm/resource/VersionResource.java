package ca.bc.mefm.resource;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import ca.bc.mefm.data.DataAccess;
import ca.bc.mefm.data.EntityVersion;

/**
 * Service endpoint for retrieval of the entity type version map. NOOOO will be array
 * @author Robert
 */
@Path("/versions")
public class VersionResource extends AbstractResource {
	
	@GET@Produces(MediaType.APPLICATION_JSON)
    public Response getVersions() {
		DataAccess da = new DataAccess();
		List<EntityVersion> entityVersions = da.getAll(EntityVersion.class);
//		Map<String, String> versions = new HashMap<String, String>();
//		
//		entityVersions.forEach( version -> {
//			versions.put(version.getEntityType(),  version.getVersion());
//		});
		
//		return responseOkWithBody(versions);
		return responseOkWithBody(entityVersions);
	}
}
