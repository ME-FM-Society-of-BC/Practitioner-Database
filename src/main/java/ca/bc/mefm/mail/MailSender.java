package ca.bc.mefm.mail;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Properties;
import java.util.logging.Logger;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import ca.bc.mefm.data.User;

public class MailSender {

	private static final Logger log = Logger.getLogger(MailSender.class.getName());

	public static void sendBlockedNotification(String senderAddress, List<User> blockedUsers) {
		
		// TODO: 
		return;
		/*
		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);

		blockedUsers.forEach( user -> {
			
			try {
				Message msg = new MimeMessage(session);
				msg.setFrom(new InternetAddress(senderAddress, "MEFM Society Moderator"));
				msg.addRecipient(Message.RecipientType.TO, new InternetAddress(user.getEmail()));
				msg.setSubject("Your comment has been blocked");
				msg.setText("This is a test");
				Transport.send(msg);
			} 
			catch (MessagingException | UnsupportedEncodingException e) {
				log.warning("Bad address for user " + user.getUsername());
			} 
		});
		*/
	}
	
	public static void sendPasswordResetCode(User user, String senderAddress, String code) {
		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);

		try {
			Message msg = new MimeMessage(session);
			msg.setFrom(new InternetAddress(senderAddress, "MEFM Society"));
			msg.addRecipient(Message.RecipientType.TO, new InternetAddress(user.getEmail()));
			msg.setSubject("MEFM Database Password Reset");
			msg.setText("Your username is '" + user.getUsername() 
				+ "'. On the Recover Password page, enter this code: "  + code);
			Transport.send(msg);
		} 
		catch (MessagingException | UnsupportedEncodingException e) {
			log.warning("Bad address for user " + user.getUsername());
		} 
		
	}

}
