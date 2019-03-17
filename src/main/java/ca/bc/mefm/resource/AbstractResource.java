package ca.bc.mefm.resource;

import java.util.List;

import javax.ws.rs.OPTIONS;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

/**
 * Base class for all resource classes ("*Resource"), providing common methods
 * for response creation
 */
public abstract class AbstractResource {

	private static String contentLocation;
	
	protected static final void setCreatePath(String path) {
		contentLocation = "/" + path + "/";
	};
    
	/**
     * Responds to an OPTIONS request. This supports execution of the client during development
     * in its own environment, rather than being deployed with the web application 
     * @return  the Response
     */
    @OPTIONS
    public Response options(){
    	ResponseBuilder builder = Response.status(Response.Status.OK);
    	builder.header("Access-Control-Allow-Origin", "*");
    	builder.header("Access-Control-Allow-Headers", "content-type");
    	builder.header("Access-Control-Allow-Methods", "HEAD,POST,GET,OPTIONS,PUT,DELETE");
    	return builder.build();
    }
    
    /**
     * Generates a normal return (200 Ok) with a body
     * @param body object to be placed in the response body
     * @return  the Response
     */
    protected Response responseOkWithBody(Object body){
    	Response.ResponseBuilder builder = Response.ok(body);
    	builder.header("Access-Control-Allow-Origin", "*");
    	return builder.build();
     }

    /**
     * Creates a 201 Created response with the key as body content
     * @param key the key
     * @return the Response
     */
    protected Response responseCreated(Long id){
    	ResponseBuilder builder = Response.status(Response.Status.CREATED);
    	builder.header("Access-Control-Allow-Origin", "*");
    	builder.header("Content-Location", contentLocation);
    	builder.entity(id);
    	return builder.build();
    }
    
    /**
     * Creates a 201 Created response with an array of keys as body content
     * @param key the key
     * @return the Response
     */
    protected Response responseCreated(List<Long> ids){
    	ResponseBuilder builder = Response.status(Response.Status.CREATED);
    	builder.header("Access-Control-Allow-Origin", "*");
    	builder.header("Content-Location", contentLocation);
    	builder.entity(ids);
    	return builder.build();
    }
    /**
     * Creates a 201 Created response with no body 
     * @return the Response
     */
    protected Response responseCreated(){
    	ResponseBuilder builder = Response.status(Response.Status.CREATED);
    	builder.header("Access-Control-Allow-Origin", "*");
    	return builder.build();
    }

    /**
     * Creates a 204 No Content response with no body 
     * @return the Response
     */
    protected Response responseNoContent(){
    	ResponseBuilder builder = Response.status(Response.Status.NO_CONTENT);
    	builder.header("Access-Control-Allow-Origin", "*");
    	return builder.build();
    }
    
    /**
     * Creates a 500 Internal Server Error response with no body 
     * @return the Response
     */
    protected Response responseError(){
    	ResponseBuilder builder = Response.status(Response.Status.INTERNAL_SERVER_ERROR);
    	return builder.build();
    }

    /**
     * Creates a 501 Not Implemented response with no body 
     * @return the Response
     */
    protected Response responseNotImplemented(){
    	ResponseBuilder builder = Response.status(Response.Status.NOT_IMPLEMENTED);
    	return builder.build();
    }

//    protected String keyToString(Key key){
//    	return key.getString();
//    }
//
//    protected Key keyFromString(String s){
//    	return Key.create(s);
//    }
}