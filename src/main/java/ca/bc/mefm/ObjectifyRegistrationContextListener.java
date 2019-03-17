package ca.bc.mefm;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.googlecode.objectify.ObjectifyService;

import ca.bc.mefm.data.Comment;
import ca.bc.mefm.data.Practitioner;
import ca.bc.mefm.data.Question;
import ca.bc.mefm.data.QuestionChoice;
import ca.bc.mefm.data.QuestionChoiceSet;
import ca.bc.mefm.data.QuestionGroup;
import ca.bc.mefm.data.RecommendationAction;
import ca.bc.mefm.data.Specialty;
import ca.bc.mefm.data.User;
import ca.bc.mefm.data.UserRole;

public class ObjectifyRegistrationContextListener implements ServletContextListener{

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
    	ObjectifyService.register(Comment.class);
    	ObjectifyService.register(Practitioner.class);
    	ObjectifyService.register(QuestionChoice.class);
    	ObjectifyService.register(QuestionGroup.class);
    	ObjectifyService.register(Question.class);
    	ObjectifyService.register(QuestionChoiceSet.class);
    	ObjectifyService.register(RecommendationAction.class);
    	ObjectifyService.register(User.class);
    	ObjectifyService.register(UserRole.class);
    	ObjectifyService.register(Specialty.class);
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        System.out.println("Shutting down!");
    }
}
