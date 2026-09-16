# UX Writing

UX writing is the words in the interface: buttons, labels, error messages, empty
states, tooltips, form fields. It's not marketing copy. It's not documentation.
It's the text the user reads while trying to do something, and its only job is
to help them do it.

---

## CTA Naming

A call-to-action button should say what happens when you click it. Not what the
button is. Not what the system does internally. What the *user* gets.

### The rule

**Use verb + object.** The verb describes the action. The object describes what
the action applies to. Together, they form a complete promise.

| Bad | Good | Why |
|-----|------|-----|
| Submit | Send message | "Submit" is a system action. "Send message" is what the user is doing. |
| OK | Save changes | OK is a dialog button from 1984. It communicates nothing. |
| Continue | Enter billing | "Continue" where? To what? The user doesn't know. |
| Done | Complete order | "Done" with what? A sandwich? |
| Click here | Download report | "Click here" describes the interaction, not the outcome. |
| Proceed | Confirm payment | "Proceed" is vague. "Confirm payment" is specific. |
| Yes | Delete account | "Yes" requires reading the question first. Say what happens. |
| No | Keep account | Negation in buttons is confusing. Say the positive action. |

### The test

If you cover up everything on the page except the button, does the button label
tell the user what will happen? "Submit" fails. "Save changes" passes.

---

## Consistency

The same action should have the same name everywhere it appears in the product.

### The rule

| Action | Name | Never |
|--------|------|-------|
| Creating a new item | "Create", "New", "Add" | Don't mix — pick one |
| Removing something | "Delete" or "Remove" — pick one | Never "Erase", "Trash", "Discard" for the same action |
| Changing something | "Edit" or "Change" — pick one | Never "Modify", "Update", "Revise" |
| Looking at something | "View" or "Open" — pick one | Never "See", "Show", "Display" |
| Closing something | "Close" | Never "Dismiss", "Exit", "Hide" |

### Real example of inconsistency

```
Page 1: "Save profile"
Page 2: "Update settings"      ← different verb, same kind of action
Page 3: "Apply changes"        ← third verb for the same thing
Modal:  "Submit"               ← fourth verb, and a bad one
```

This is confusing. The user has to re-learn every page. Pick one verb and use it
everywhere: "Save profile", "Save settings", "Save changes", "Save".

---

## Empty States

An empty state is what the user sees when there's nothing to show: an empty
inbox, a new project with no files, a search with no results. Most empty states
are either apologetic ("Nothing here!") or instructional ("Click the button to
add something"). Both are wrong.

### The rule

An empty state should be an **invitation**, not an apology. Don't say "there's
nothing here." Say "here's what could be here, and here's how to make it happen."

| Bad | Good |
|-----|------|
| "No messages yet." | "Messages from your team will appear here. Send your first message." |
| "Nothing to show." | "Your dashboard is empty. Connect an integration to see data." |
| "0 results." | "No results for 'widget'. Try a different search term." |
| "No items." | "Start by creating your first project." |
| "You have no notifications." | "We'll let you know when something needs your attention." |

### Structure

A good empty state has three parts:

1. **Headline:** What would normally be here, stated positively
2. **Body:** What the user can do to change this
3. **Action:** A button or link to take that action

```
Headline: "Your team chat is ready"
Body: "Invite your teammates to start collaborating."
Button: [Invite teammates]
```

Not:
```
Headline: "No messages"
Body: "There are no messages in this channel."
Button: [OK]
```

---

## Error Messages

An error message has two jobs: say what happened, and say how to fix it. Most
error messages do neither.

### The rule

Every error message must answer two questions:

1. **What went wrong?** In plain language, not an error code.
2. **How do I fix it?** A specific action the user can take.

### Examples

| Bad | Good |
|-----|------|
| "Error 403" | "You don't have permission to view this page. Contact your admin to request access." |
| "Invalid input" | "Phone number must be 10 digits. Remove spaces and try again." |
| "Upload failed" | "The file is larger than 10MB. Compress it or choose a smaller file." |
| "Something went wrong" | "We couldn't process your payment. Check your card details and try again." |
| "Network error" | "Connection lost. Your changes are saved locally and will sync when you're back online." |
| "500 Internal Server Error" | "Something broke on our end. We've been notified and are working on it. Try again in a few minutes." |

### Never blame the user

```diff
- "You entered an invalid email address."
+ "That email address doesn't look right. Check for typos."

- "You didn't fill out the required fields."
+ "Complete the highlighted fields to continue."
```

### Never be cute

Error messages are not the place for personality. When a user hits an error,
they're frustrated. A joke makes it worse.

```diff
- "Oopsie! Our servers are taking a nap. ☕️"
+ "We're experiencing an outage. We'll be back shortly."
```

---

## Sentence Case for All UI Labels

Every UI label, button, menu item, and form field should be in sentence case:
capitalize only the first word and proper nouns.

### The rule

```diff
- "Save Changes"       → "Save changes"
- "Email Address"      → "Email address"
- "Date Of Birth"      → "Date of birth"
- "Create New Account" → "Create new account"
- "Forgot Password?"   → "Forgot password?"
```

### Why

Title Case Is Harder To Read. The human eye recognizes lowercase word shapes —
sentence case preserves those shapes. Title case flattens every word into a
rectangular block, making text harder to scan. Title case also creates
ambiguity: is "Create New Account" one action or three things? Sentence case
reads as natural language, which is what UI labels are.

### The exception

Proper nouns: product names, brand names, people's names. "Connect to GitHub"
not "Connect to github."

---

## No Filler Words

Delete every word that doesn't carry information. Users don't read UI text —
they scan it. Every extra word is an obstacle.

### Examples

```diff
- "In order to continue, please enter your email address."
+ "Enter your email address."

- "Are you sure you want to delete this item? This action cannot be undone."
+ "Delete this item? This can't be undone."

- "Please note that your changes have been saved successfully."
+ "Changes saved."

- "We would like to inform you that your session has expired."
+ "Session expired. Log in again."

- "At this time, there are no new notifications available for you."
+ "No new notifications."
```

### Filler words to delete on sight

- "In order to"
- "Please note that"
- "We would like to"
- "At this time"
- "Currently"
- "Successfully" (it's implied if it worked)
- "Simply" / "Just" (condescending — it's simple for you, not the user)
- "Very" / "Really" / "Actually"

---

## Voice

Voice is the personality of your UI text. It should match the brand, sound
human, and be concise. These three goals often conflict — the skill is in
balancing them.

### Brand alignment

| Brand Type | Voice | Example |
|-----------|-------|---------|
| Professional services | Direct, respectful, clear | "Your report is ready." |
| Developer tools | Precise, technical, unadorned | "Build completed. 0 errors." |
| Consumer social | Warm, casual, brief | "Nice photo! Share it?" |
| Healthcare | Clear, reassuring, plain | "Your results are ready to review with your doctor." |
| Finance | Factual, secure, unambiguous | "Transfer of $500.00 confirmed." |
| Kids/education | Encouraging, simple, playful | "You did it! Try the next level." |

### Human, not robotic

Write like a person talking to another person. Read your UI text out loud. If
you wouldn't say it to someone sitting next to you, rewrite it.

```diff
- "Authentication credentials could not be validated."
+ "Wrong password. Try again."

- "Your request has been submitted for processing."
+ "We got your request. We'll email you when it's ready."

- "Utilize the dropdown menu to select your preferred option."
+ "Choose an option from the menu."
```

### Concise, but not terse

Conciseness is not about character count. It's about information density. A
five-word sentence that tells the user exactly what to do is better than a
three-word sentence that leaves them guessing.

```
"Changes saved."          ← concise AND clear
"Saved."                  ← too terse, what was saved?
"Your changes have been
 successfully saved."     ← filler words
```

---

## Common Copy Antipatterns

### 1. Lorem ipsum in production

Placeholder text that ships. It happens because someone forgot to replace it,
and nobody caught it in review. If you use lorem ipsum during development, add a
build step that fails if lorem ipsum appears in the output.

### 2. Jargon in user-facing text

```diff
- "The CDN cache has been invalidated."
+ "Your changes are now live."
```

Internal technical terms don't belong in the UI. The user doesn't know or care
what a CDN is.

### 3. Passive voice that hides responsibility

```diff
- "A refund will be issued."
+ "We'll refund your payment within 3 days."

- "The account has been suspended."
+ "We suspended this account for violating our terms."
```

Passive voice hides who did what. In UI text, that's usually the company hiding
from the user. Be accountable.

### 4. Vague microcopy

```diff
- "Something went wrong."
+ "We couldn't connect to your bank. Try again in a few minutes."

- "Changes may take up to 24 hours."
+ "Changes take up to 24 hours to appear."
```

"May" and "something" are evasion words. Say what you know.

### 5. Double negatives

```diff
- "Don't uncheck this box unless you don't want notifications."
+ "Check this box to receive notifications."
```

Double negatives require the user to solve a logic puzzle to understand what
the setting does. Always state settings in the positive.

### 6. "Click here" as link text

```diff
- "To view your invoice, click here."
+ "View your invoice."
```

Link text should describe the destination or action. "Click here" describes the
interaction, which the user already knows how to do. It also fails for screen
readers: a list of links that all say "click here" is useless.

### 7. Confirmation fatigue

```diff
- "Are you sure you want to mark this as read? (OK / Cancel)"
+ Just mark it as read. Undo if they change their mind.
```

Don't confirm reversible actions. Every unnecessary confirmation dialog teaches
the user to click "OK" without reading. When you actually need a confirmation
(delete account, send money), they won't read it either.

---

## Quick Reference

| Question | Answer |
|----------|--------|
| CTA format? | Verb + object: "Save changes", "Send message" |
| Case for labels? | Sentence case: "Email address" not "Email Address" |
| Error message structure? | What happened + how to fix it |
| Empty state structure? | Invitation: what could be here + how to make it happen |
| "Submit" or "OK"? | Never. Say what happens. |
| Filler words? | Delete them. All of them. |
| Voice? | Brand-aligned, human, concise |
| Confirmations? | Only for irreversible actions |