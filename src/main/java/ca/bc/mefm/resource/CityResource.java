package ca.bc.mefm.resource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import ca.bc.mefm.data.City;
import ca.bc.mefm.data.DataAccess;
import ca.bc.mefm.data.DataAccess.Filter;

/**
 * Service endpoint for City entity retrieval. 
 * @author Robert
 */
@Path("/cities")
public class CityResource extends AbstractResource  {
    /**
     * Fetches all City entities for a specified set of provinces
     * @param provinces a set of province ids separated by "|"
     * @return list of Cities
     */
	@GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCities(@QueryParam("provinces") String provinces){
		if (provinces == null || provinces.length() == 0) {
			return responseOkWithBody(new ArrayList<City>());
		}
		DataAccess da = new DataAccess();
		
		Set<Long> provinceIds = Arrays.asList(provinces.split("\\|"))
				.stream().map(province -> {
					return Long.valueOf(province);
				})
				.collect(Collectors.toSet());

		List<City> cities = da.getAll(City.class)
				.stream()
				.filter(city -> {
					return provinceIds.contains(city.getProvinceId());
				})
				.collect(Collectors.toList());
		
        return responseOkWithBody(cities);
    }

}
