package ca.bc.mefm.data;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.google.appengine.api.datastore.Cursor;
import com.google.appengine.api.datastore.QueryResultIterator;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.cmd.Query;


import lombok.Data;

import static com.googlecode.objectify.ObjectifyService.ofy;

/**
 * Implements all Datastore operations through the Objectify service
 * @author Robert
 */
public class DataAccess {
	private static final Logger log = Logger.getLogger(DataAccess.class.getName());

	public <T> List<T> getAll(Class<T> clazz){
		List<T> list = ofy().load().type(clazz).list();
		return list;
	}
	
	public <T> List<T> getAllByFilters(Class<T> clazz, Filter ...filters){
		Query<T> query = ofy().load().type(clazz);
		for (Filter filter: filters) {
			query = query.filter(filter.getExpression(), filter.getValue());
		}
		List<T> list = query.list();
		return list;
	}
	
	public <T> int deleteAll(Class<T> clazz) {
		int count = 0;
		Query<T> query = ofy().load().type(clazz).limit(100);
		
		while (true) {
		    QueryResultIterator<T> iterator = query.iterator();
		    if (!iterator.hasNext()) {
		    	break;
		    }
		    while (iterator.hasNext()) {
		        Object o = iterator.next();
		        delete(o);
		        count++;
		    }
		    Cursor cursor = iterator.getCursor();
		    query = query.startAt(cursor);
		}
		return count;
	}
	
	/**
	 * Saves a list of City entities
	 * @param list
	 */
	public void put(List<City> list){
		ofy().save().entities(list).now();
	}
	
	public void put(Object o){
		ofy().save().entity(o).now();
	}
	
	/**
	 * Deletes an entity identified by its key value
	 * @param clazz the entity class
	 * @param id the key value
	 */
	public <T> void delete(Class<T> clazz, long id){
		Key<T> key = Key.create(clazz, id);
		ofy().delete().key(key).now();
	}
	
	/**
	 * Deletes an specified entity
	 * @param entity
	 */
	public <T> void delete(Object entity) {
		ofy().delete().entity(entity).now();
	}
	
	public <T> T find(Key<T> key){
		T o = ofy().load().key(key).now();
		if (o == null){
			log.log(Level.SEVERE, "+++ Find\n" + "--- Not found key = " + (key.getName() == null ? key.getId() : key.getName()));
		}
		return o;
	}
	
	public <T> T findByQuery(Class<T> clazz, String field, String value) {
		T o = ofy().load().type(clazz).filter(field, value).first().now();
		return o;
	}
	
	@Data
	public static class Filter {
		public String 	expression;
		public Object	value;
		
		public Filter(String expression, Object value) {
			this.value = value;
			this.expression = expression;
		}
	}

}
