package ca.bc.mefm;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.google.maps.DistanceMatrixApiRequest;
import com.google.maps.GaeRequestHandler;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.DistanceMatrixElementStatus;
import com.google.maps.model.DistanceMatrixRow;

public class GoogleMapsApi {

	private static GeoApiContext 	context;	
	private static GoogleMapsApi instance;	
	
	private GoogleMapsApi() {
		context = new GeoApiContext.Builder(new GaeRequestHandler.Builder())
				.apiKey("AIzaSyC5CyPj-3kttOqL4YM09tuGQJnjtfAzdrM").build();
	}	
	
	private static GoogleMapsApi instance() { 
		if (instance == null){ 
			synchronized (GoogleMapsApi.class) { 
				if(instance==null){ 
					instance = new GoogleMapsApi(); 
				} 
			} 
		} 
		return instance; 	
	}

	public static List<String> getDistances(String[] origins, String[] destinations) {
		
		DistanceMatrixApiRequest request = new DistanceMatrixApiRequest(instance().context)
				.origins(origins)
				.destinations(destinations);
		
		try {
			DistanceMatrix matrix = request.await();
			DistanceMatrixRow[] rows = matrix.rows;
			List<String> distances = Arrays.asList(rows[0].elements)
				.stream()
				.map(element -> {
					if (element.status.equals(DistanceMatrixElementStatus.OK)) {
						return element.distance.humanReadable;
					}
					else {
						return "Not found";
					}
				})
				.collect(Collectors.toList()
			);
			return distances;
		}
		catch (Exception e) {
		    return Arrays.asList(new String[] {e.getMessage()});
		}
	}
	
	
}
