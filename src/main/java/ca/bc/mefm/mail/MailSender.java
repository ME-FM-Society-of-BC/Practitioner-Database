package ca.bc.mefm.mail;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Properties;
import java.util.logging.Logger;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import ca.bc.mefm.ApplicationProperties;
import ca.bc.mefm.data.User;

/**
 * Methods to send email messages for blocked comments, and password reset. The
 * sending address is a "no-reply" address configured in the application properties
 * @author Robert
 */
public class MailSender {

	private static final Logger log = Logger.getLogger(MailSender.class.getName());
	private static final String emailSenderAddress = ApplicationProperties.get("noreply.address");
	
	/**
	 * Sends a set of messages to users who created comments which have been blocked
	 * @param moderatorAddress
	 * @param blockedUsers
	 */
	public static void sendBlockedNotification(String moderatorAddress, List<User> blockedUsers) {
		
		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);
		
		final Address[] replyTo;
		try {
			replyTo = new Address[]{new InternetAddress(moderatorAddress, "MEFM Society Moderator")};
		}
		catch (UnsupportedEncodingException e) {
			log.severe("Error creating reply to address" + e);
			return;
		}		

		blockedUsers.forEach( user -> {
			try {
				Message msg = new MimeMessage(session);
				msg.setFrom(new InternetAddress(emailSenderAddress, "HealthFinder4ME Moderator"));
				msg.addRecipient(Message.RecipientType.TO, new InternetAddress(user.getEmail()));
				msg.setReplyTo(replyTo);
				msg.setSubject("Your comment has been blocked");
				// TODO Determine text of blocked comment message
				msg.setText("This is a test");
				Transport.send(msg);
			} 
			catch (MessagingException | UnsupportedEncodingException e) {
				log.warning("Bad address for user " + user.getUsername());
			} 
		});
	}
	
	/**
	 * Sends a password reset code
	 * @param user the user requesting the password reset
	 * @param code the reset code
	 */
	public static void sendPasswordResetCode(User user, String code) {
		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);

		try {
			Message msg = new MimeMessage(session);
			msg.setFrom(new InternetAddress(emailSenderAddress, "HealthFinder4ME"));
			msg.addRecipient(Message.RecipientType.TO, new InternetAddress(user.getEmail()));
			msg.setSubject("MEFM Database Password Reset");
			msg.setText("Your username is '" + user.getUsername() 
				+ "'. On the Recover Password page, enter this code: "  + code);
			Transport.send(msg);
			log.info("Sent password reset code to " + user.getEmail());
		} 
		catch (MessagingException | UnsupportedEncodingException e) {
			log.warning("Bad address for user " + user.getUsername());
		} 
	}
}
