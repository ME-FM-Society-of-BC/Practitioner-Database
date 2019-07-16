package ca.bc.mefm.mail;

import java.io.UnsupportedEncodingException;
import java.text.MessageFormat;
import java.util.Date;
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
import ca.bc.mefm.resource.CommentResource;

/**
 * Methods to send email messages for blocked comments, password reset, and support requests. 
 * @author Robert
 */
public class MailSender {

	private static final Logger log = Logger.getLogger(MailSender.class.getName());
	private static final String noReplyAddress = ApplicationProperties.get("email.address.noreply");
	
	/**
	 * Sends a message to user who created a comment which have been blocked
	 * @param moderatorAddress
	 * @param blockedComment
	 */
	public static void sendBlockedNotification(String moderatorAddress, CommentResource.BlockedComment blockedComment) {
		
		final Address[] replyTo;
		try {
			replyTo = new Address[]{new InternetAddress(moderatorAddress, "MEFM Society Moderator")};
		}
		catch (UnsupportedEncodingException e) {
			log.severe("Error creating reply to address" + e);
			return;
		}
		String template = ApplicationProperties.get("email.blocked.message");
		
		// Insert username and practitioner name into the message
		User user = blockedComment.getUser();
		String text = blockedComment.getComment().getText();
		if (text.length() > 20) {
			text = text.substring(0, 20);
		}
		Date date = new Date(blockedComment.getComment().getDate());
		
		String message = MessageFormat.format(template, 
				user.getUsername(),
				blockedComment.getPractitioner().getFirstName() + " " + blockedComment.getPractitioner().getLastName(),
				date,
				text);
		try {
			sendMessage(
					new InternetAddress(noReplyAddress, "HealthFinder4ME Moderator"), 
					new InternetAddress(user.getEmail()), 
					ApplicationProperties.get("email.blocked.subject"), 
					message,
					replyTo);
			log.info("Sent blocked comment notification to " + user.getEmail());
		} 
		catch (MessagingException | UnsupportedEncodingException e) {
			log.warning("Bad address for user " + user.getUsername());
		} 
	}
	
	/**
	 * Sends a password reset code
	 * @param user the user requesting the password reset
	 * @param code the reset code
	 */
	public static void sendPasswordResetCode(User user, String code) {

		try {
			String message = "Your username is '" + user.getUsername() 
			+ "'. On the Recover Password page, enter this code: "  + code;
			
			sendMessage(
					new InternetAddress(noReplyAddress, "HealthFinder4ME"), 
					new InternetAddress(user.getEmail()), 
					"MEFM Database Password Reset", 
					message,
					null);

			log.info("Sent password reset code to " + user.getEmail());
		} 
		catch (MessagingException | UnsupportedEncodingException e) {
			log.warning("Bad address for user " + user.getUsername());
		} 
	}
	
	/**
	 * Sends a support request message
	 * @param user the user making the support request
	 * @param message the request message
	 */
	public static void sendSupportRequest(User user, String message) {

		final Address[] replyTo;
		try {
			replyTo = new Address[]{new InternetAddress(user.getEmail(), user.getUsername())};
		}
		catch (UnsupportedEncodingException e) {
			log.severe("Error creating reply to address" + e);
			return;
		}
		try {
			sendMessage(
					new InternetAddress(noReplyAddress, "HealthFinder4ME"), 
					new InternetAddress(ApplicationProperties.get("email.address.support")), 
					"Support Request", 
					message,
					replyTo);

			log.info("Sent support request from " + user.getEmail() + " to " + ApplicationProperties.get("email.address.support"));
		} 
		catch (MessagingException | UnsupportedEncodingException e) {
			log.warning("Bad address for user " + user.getUsername());
		} 
	}
	
	private static void sendMessage(InternetAddress from, InternetAddress to, String subject, String message, Address[] replyTo) 
		throws MessagingException, UnsupportedEncodingException {
		
		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);

		Message msg = new MimeMessage(session);
		msg.setFrom(from);
		msg.addRecipient(Message.RecipientType.TO, to);
		msg.setSubject(subject);
		msg.setText(message);
		
		if (replyTo != null) {
			msg.setReplyTo(replyTo);
		}		
		Transport.send(msg);
	}
}
