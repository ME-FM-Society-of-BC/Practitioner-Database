package ca.bc.mefm.mail;

import com.google.appengine.api.mail.BounceNotification;
import com.google.appengine.api.mail.BounceNotificationParser;

import java.io.IOException;
import java.util.logging.Logger;
import javax.mail.MessagingException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BounceHandlerServlet extends HttpServlet {

	private static final Logger log = Logger.getLogger(BounceHandlerServlet.class.getName());

	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		try {
			BounceNotification bounce = BounceNotificationParser.parse(req);
			//      log.warning("Bounced email notification.");
			// The following data is available in a BounceNotification object
			String from = bounce.getOriginal().getFrom();
			String to = bounce.getOriginal().getTo() ;
			// bounce.getOriginal().getSubject() 
			// bounce.getOriginal().getText() 
			// bounce.getNotification().getFrom() 
			// bounce.getNotification().getTo() 
			// bounce.getNotification().getSubject() 
			// bounce.getNotification().getText() 
			// ...
		} 
		catch (MessagingException e) {
			log.severe("BounceHandlerServlet " + e);
		}
	}
}
