package ca.bc.mefm.data;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.cmd.Query;

import lombok.Data;

import static com.googlecode.objectify.ObjectifyService.ofy;

public class DataAccess {
	private static final Logger log = Logger.getLogger(DataAccess.class.getName());
	
	static {
		try {
			ObjectifyService.register(Class.forName("ca.bc.mefm.data.Choice"));
			ObjectifyService.register(Class.forName("ca.bc.mefm.data.Comment"));
			ObjectifyService.register(Class.forName("ca.bc.mefm.data.Practitioner"));
			ObjectifyService.register(Class.forName("ca.bc.mefm.data.Question"));
			ObjectifyService.register(Class.forName("ca.bc.mefm.data.QuestionChoiceSet"));
			ObjectifyService.register(Class.forName("ca.bc.mefm.data.QuestionGroup"));
			ObjectifyService.register(Class.forName("ca.bc.mefm.data.QuestionSet"));
			ObjectifyService.register(Class.forName("ca.bc.mefm.data.RecommendationAction"));
			ObjectifyService.register(Class.forName("ca.bc.mefm.data.Specialty"));
			ObjectifyService.register(Class.forName("ca.bc.mefm.data.User"));
			ObjectifyService.register(Class.forName("ca.bc.mefm.data.UserRole"));
		}
		catch (ClassNotFoundException e){
			log.warning(e.getMessage());
		}		
	}

	public <T> List<T> getAll(Class<T> clazz){
		List<T> list = ofy().load().type(clazz).list();
		log.log(Level.INFO, "Found " + list.size() + " objects"); 
		return list;
	}
	
	public <T> List<T> getAllByFilters(Class<T> clazz, Filter ...filters){
		Query<T> query = ofy().load().type(clazz);
		for (Filter filter: filters) {
			query = query.filter(filter.getExpression(), filter.getValue());
		}
		List<T> list = query.list();
		log.log(Level.INFO, "Found " + list.size() + " objects"); 
		return list;
	}
	
	public void ofyPut(Object o){
		ofy().save().entity(o).now();
		log.log(Level.INFO, "+++ Put " + o.getClass().getName() + "\n" + o.toString());
	}
	
	public <T> void ofyDelete(Class<T> clazz, long id){
		Key<T> key = Key.create(clazz, id);
		ofy().delete().key(key).now();
	}
	
	public <T> T ofyFind(Key<T> key){
		T o = ofy().load().key(key).now();
		if (o == null){
			log.log(Level.SEVERE, "+++ Find\n" + "--- Not found key = " + (key.getName() == null ? key.getId() : key.getName()));
		}
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
