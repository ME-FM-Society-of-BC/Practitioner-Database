package ca.bc.mefm.resource;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import ca.bc.mefm.data.DataAccess;
import ca.bc.mefm.data.Practitioner;
import ca.bc.mefm.data.Question;
import ca.bc.mefm.data.QuestionChoice;
import ca.bc.mefm.data.QuestionGroup;
import ca.bc.mefm.data.Specialty;
import ca.bc.mefm.data.User;
import ca.bc.mefm.data.UserRole;

/**
 * This end point is part of the scheme for initializing the database with the following entities:
 * 
 * <li>UserRole</li>
 * <li>User (for fixed pre-determined Admin users)</li>
 * <li>Specialty</li>
 * <li>Question/li>
 * <li>QuestionChoice</li>
 * <li>QuestionGroup</li>
 * <p>
 * The first request the client makes is to this end point. 
 * If the database is empty, the hard coded values defined within this class are written to the database. 
 *
 * @author Robert
 */
@Path("/initialize")
public class InitializationResource extends AbstractResource {

    /**
     * Trigger a check of the database content.
     * If the database is empty, it is seeded with the values defined in this class
     * @return 200 OK
     */
    @GET
    public Response initialize(){
        DataAccess da = new DataAccess();
        List<UserRole> list = da.getAll(UserRole.class);
        if (list.isEmpty()) {
        	// The database is empty, either because this is the first time the 
        	// application has been invoked, or the database has been emptied 
        	// using the Google App Engine admin console, with the intention of
        	// adding new entities
        	
        	roles.forEach((UserRole o) -> da.ofyPut(o));
        	users.forEach((User o) -> da.ofyPut(o));
        	specialties.forEach((Specialty o) -> da.ofyPut(o));
        	questionChoices.forEach((QuestionChoice o) -> da.ofyPut(o));
        	questionGroups.forEach((QuestionGroup o) -> da.ofyPut(o));
        	questions.forEach((Question o) -> da.ofyPut(o));
       	practitioners.forEach((Practitioner o) -> da.ofyPut(o));
        }
        return responseNoContent();
    }
    
    // TODO: This is a temporary kludge
    List<Practitioner> practitioners = Arrays.asList(new Practitioner[]{
    	new Practitioner(1L, "smith", "john","1234 somewhere ave","victoria","BC","Canada",    "v8v8v8","2501112222","www.aldaily.com",9L,
    		new Date(), new Date()),
    	new Practitioner(2L, "does",  "jane","9876 somewhere st","victoria","BC","Canada",    "v0v0v0","2503334444","www.xxxx.com",15L,
    		new Date(), new Date())        
    });
    

    List<UserRole> roles = Arrays.asList(new UserRole[]{
        new UserRole(1L, UserRole.Type.ACTIVE),
        new UserRole(2L, UserRole.Type.ADMINISTRATOR)
    });

    // Two built in accounts are created. The first is for the MEFM administrative user
    // responsible for "vetting" user comments.
    // The second is for a technical administrator. This is intended to support possible
    // future capabilities related to modification or updates to the database schema and/or 
    // modifications to the question definitions
    
    List<User> users = Arrays.asList(new User[]{
            new User(1L, "admin", "password", "your-email-here", 2L, new Date(), User.Status.ENABLED),
            new User(2L, "techadmin", "DumD0nald", "robert.t.toms@gmail.com", 2L, new Date(), User.Status.ENABLED)
    });
    
    List<Specialty> specialties = Arrays.asList(new Specialty[]{
        new Specialty(1L, "Anaesthesia"),
        new Specialty(2L, "Cardiology"),
        new Specialty(3L, "Chiropody"),
        new Specialty(4L, "Clinical Immunology"),
        new Specialty(5L, "Dental"),
        new Specialty(6L, "Dietician"),
        new Specialty(7L, "Emergency Medicine"),
        new Specialty(8L, "Endocrinology"),
        new Specialty(9L, "Family and General Pracice"),
        new Specialty(10L, "Gastroenterology"),
        new Specialty(11L, "Genetics"),
        new Specialty(12L, "Geriatrics"),
        new Specialty(13L, "Haematology "),
        new Specialty(14L, "Internal Medicine"),
        new Specialty(15L, "Kinesiology"),
        new Specialty(16L, "Midwife"),
        new Specialty(17L, "Neurology"),
        new Specialty(18L, "Nuclear Medicine "),
        new Specialty(19L, "Nurse Practioner"),
        new Specialty(20L, "Obstetrics and Gynaecology"),
        new Specialty(21L, "Occupational Therapy"),
        new Specialty(22L, "Ophthalmology "),
        new Specialty(23L, "Optometry"),
        new Specialty(24L, "Osteopathy"),
        new Specialty(25L, "Otolaryngology "),
        new Specialty(26L, "Paediatrics"),
        new Specialty(27L, "Pathology "),
        new Specialty(28L, "Physical Medicine "),
        new Specialty(29L, "Physiotherapy"),
        new Specialty(30L, "Psychiatry"),
        new Specialty(31L, "Psychology"),
        new Specialty(32L, "Respiratory Diseases "),
        new Specialty(33L, "Rheumatology "),
        new Specialty(34L, "Urology "),
        new Specialty(35L, "Naturopath"),
        new Specialty(36L, "Integrative Medicine"),
        new Specialty(37L, "Chiropractor"),
        new Specialty(38L, "Massage Therapy"),
        new Specialty(39L, "Traditional Chines Medicine"),
        new Specialty(40L, "Chiropractor"),
        new Specialty(41L, "Osteopath"),
        new Specialty(42L, "Acupuncture"),
        new Specialty(43L, "Homeopath"),
        new Specialty(44L, "Other Alternative Profession")
    });

    List<QuestionChoice> questionChoices = Arrays.asList(new QuestionChoice[]{
        new QuestionChoice(1L, "Never heard of it",            1L),
        new QuestionChoice(2L, "Knows very little",            1L),
        new QuestionChoice(3L, "Moderate knowledge",           1L),
        new QuestionChoice(4L, "Very knowledgeable",           1L),
        new QuestionChoice(5L, "Expert",                       1L),
        new QuestionChoice(6L, "Very bad",                     2L),
        new QuestionChoice(7L, "Bad",                          2L),
        new QuestionChoice(8L, "Acceptable",                   2L),
        new QuestionChoice(9L, "Good",                         2L),
        new QuestionChoice(10L, "Excellent ",                  2L),
        new QuestionChoice(11L, "Very unhelpful",              3L),
        new QuestionChoice(12L, "Unhelpful",                   3L),
        new QuestionChoice(13L, "Acceptable",                  3L),
        new QuestionChoice(14L, "Helpful",                     3L),
        new QuestionChoice(15L, "Very helpful",                3L),
        new QuestionChoice(16L, "Very unwilling",              4L),
        new QuestionChoice(17L, "Unwilling",                   4L),
        new QuestionChoice(18L, "Unsure",                      4L),
        new QuestionChoice(19L, "Will consider",               4L),
        new QuestionChoice(20L, "Willing",                     4L),
        new QuestionChoice(21L, "Made things worse",           5L),
        new QuestionChoice(22L, "Unhelpful",                   5L),
        new QuestionChoice(23L, "Acceptable",                  5L),
        new QuestionChoice(24L, "Effective",                   5L),
        new QuestionChoice(25L, "Very effective",              5L),
        new QuestionChoice(26L, "Very unhelpful / rude",       6L),
        new QuestionChoice(27L, "Unhelpful",                   6L),
        new QuestionChoice(28L, "Acceptable",                  6L),
        new QuestionChoice(29L, "Helpful",                     6L),
        new QuestionChoice(30L, "Very helpful",                6L),
        new QuestionChoice(31L, "Always running very behind",  7L),
        new QuestionChoice(32L, "Not punctual",                7L),
        new QuestionChoice(33L, "Often not punctual",          7L),
        new QuestionChoice(34L, "Mostly punctual",             7L),
        new QuestionChoice(35L, "Always punctual",             7L),
        new QuestionChoice(36L, "Less than $50",               8L),
        new QuestionChoice(37L, "$50 - $75",                   8L),
        new QuestionChoice(38L, "$75 - $100",                  8L),
        new QuestionChoice(39L, "$100 - $150",                 8L),
        new QuestionChoice(40L, "Over $150",                   8L),
        new QuestionChoice(41L, "Strongly do not recommend",   9L),
        new QuestionChoice(42L, "Possibly recommend if none other is available", 9L),
        new QuestionChoice(43L, "Not sure",                    9L),
        new QuestionChoice(44L, "Would recommend",             9L),
        new QuestionChoice(45L, "Would strongly recommend",    9L)
	});

    List<QuestionGroup> questionGroups = Arrays.asList(new QuestionGroup[] {
        new QuestionGroup(1L, "1 Did you see this practioner for (check which apply)"),
        new QuestionGroup(2L, "2 What is the practitioner's level of knowledge about"),
        new QuestionGroup(3L, "3 How familiar is the practitioner with any of the consensus criteria for ME?"),
        new QuestionGroup(4L, "4 How familiar is the practitioner with any of the consensus criteria for fibromyalgia?"),
        new QuestionGroup(5L, "5 Did the practitioner prescribe graded exercise therapy (GET) as treatment"),
        new QuestionGroup(6L, "6 Did the practitioner prescribe cognitive behaviour therapy (CBT) as treatment for the illness, rather than a management tool, for"),
        new QuestionGroup(7L, "8 Regarding a treatment plan, how helpful was the practitioner with"),
        new QuestionGroup(8L, "15 How accessible is the practitioner's office?")
        });

    List<Question> questions = Arrays.asList(new Question[] {
        new Question( 1L,  1,  null,  1L,     Question.Type.YES_NO,         "ME?"),
        new Question( 2L,  2,  null,  1L,     Question.Type.YES_NO,         "FM?"),
        new Question( 3L,  3,  1L,    2L,     Question.Type.SINGLE_CHOICE,  "ME?"),
        new Question( 4L,  4,  1L,    2L,     Question.Type.SINGLE_CHOICE,  "FM?"),
        new Question( 5L,  5,  1L,    3L,     Question.Type.SINGLE_CHOICE,  "Canadian Consensus Criteria, (2003)"),
        new Question( 6L,  6,  1L,    3L,     Question.Type.SINGLE_CHOICE,  "International Consensus Criteria, (2011)"),
        new Question( 7L,  7,  1L,    3L,     Question.Type.SINGLE_CHOICE,  "Myalgic Encephalomyelitis/Chronic Fatigue Syndrome Diagnosis and Management in Young People: A Primer (2017)"),
        new Question( 8L,  8,  1L,    3L,     Question.Type.SINGLE_CHOICE,  "Beyond Myalgic Encephalomyelitis/Chronic Fatigue Syndrome: Redefining an Illness, (2015)"),
        new Question( 9L,  9,  1L,    4L,     Question.Type.SINGLE_CHOICE,  "Fibromyalgia Syndrome: Canadian Clinical Working Case Definition, Diagnostic and Treatment Protocols. A Consensus Document"),
        new Question( 10L, 10, 1L,    4L,     Question.Type.SINGLE_CHOICE,  "2010 American College of Rheumatology (ACR) Preliminary Diagnostic Criteria for Fibromyalgia: Overview"),
        new Question( 11L, 11, 1L,    5L,     Question.Type.YES_NO,         "ME?"),
        new Question( 12L, 12, null,  5L,     Question.Type.YES_NO,         "FM?"),
        new Question( 13L, 13, null,  6L,     Question.Type.YES_NO,         "ME?"),
        new Question( 14L, 14, null,  6L,     Question.Type.YES_NO,         "FM?"),
        new Question( 15L, 15, 2L,    null,   Question.Type.SINGLE_CHOICE,  "7 How is the parctitioner's bedside manner at your visit?"),
        new Question( 16L, 16, 3L,    7L,     Question.Type.SINGLE_CHOICE,  "Developing a treatment plan? "),
        new Question( 17L, 17, 3L,    7L,     Question.Type.SINGLE_CHOICE,  "Overseeing a treatment plan?"),
        new Question( 18L, 18, null,  null,   Question.Type.SINGLE_CHOICE,  "9 How willing is the practitioner to read information you bring to the consult?"),
        new Question( 19L, 19, 4L,    null,   Question.Type.SINGLE_CHOICE,  "10 How willing is the practitioner to prescribe alternative or off-label treatments?"),
        new Question( 20L, 20, 5L,    null,   Question.Type.SINGLE_CHOICE,  "11 How effective was is practitioner at helping to manage pain issues?"),
        new Question( 21L, 21, 3L,    null,   Question.Type.SINGLE_CHOICE,  "12 How helpful was the practitioner with completing insurance/disability forms?"),
        new Question( 22L, 22, null,  null,   Question.Type.YES_NO,         "13 Did the practitioner offer referrals to other practitioner or clinics?"),
        new Question( 23L, 23, 6L,    null,   Question.Type.SINGLE_CHOICE,  "14 How helpful is the parctitioner's staff"),
        new Question( 24L, 24, null,  8L,     Question.Type.YES_NO,         "Wheelchair accessible"),
        new Question( 25L, 25, null,  8L,     Question.Type.YES_NO,         "Handicap parking available"),
        new Question( 26L, 26, null,  8L,     Question.Type.YES_NO,         "Public transport close by"),
        new Question( 27L, 27, null,  8L,     Question.Type.YES_NO,         "Elevator near office"),
        new Question( 28L, 28, 7L,    null,   Question.Type.SINGLE_CHOICE,  "16 How punctual was the practitioner?"),
        new Question( 29L, 29, null,  null,   Question.Type.YES_NO,         "17 Did the practitioner offer you follow ups and/or continuous support?"),
        new Question( 30L, 30, null,  null,   Question.Type.YES_NO,         "18 Was your visit with the parctitioner's service covered by MSP?"),
        new Question( 31L, 31, 8L,    null,   Question.Type.SINGLE_CHOICE,  "19 If answer to Q.17 is NO, what is the parctitioner's consult fee?"),
        new Question( 32L, 32, 9L,    null,   Question.Type.SINGLE_CHOICE,  "20 How likely are you to recommend this practitioner?")
        });
}


