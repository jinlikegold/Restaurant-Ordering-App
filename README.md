# Restaurant Ordering App

From a solo project in Scrimba's "Essential Javascript Module" - I took a [Figma design](https://www.figma.com/file/Hdgwo69Dym9vVsxbuPbl0h/Mobile-Restaurant-Menu?node-id=0%3A1) and created this online ordering app for a diner.

## Learning Notes:

It was a great review of form validation in Javascript. My challenge was making sure the required fields in the form validation weren't overridden by the modal closing. 

Initially, I attached the event listener for closing the modal & showing the confirmation message to clicking the "pay" button, but the modal would close even if the required inputs were not filled. I changed the event listener to attach to the "submit" action instead of the form, and also overrode the default refresh action of the form, so as to show the user the final message for confirming the order.

I also troubleshooted the function removeItemfromOrder() as it required using the splice method (vs. simpler array methods I had learned previously, such as pop), in order to remove the correct item in the array.


## About Scrimba

At Scrimba our goal is to create the best possible coding school at the cost of a gym membership! 💜
If we succeed with this, it will give anyone who wants to become a software developer a realistic shot at succeeding, regardless of where they live and the size of their wallets 🎉
The Frontend Developer Career Path aims to teach you everything you need to become a Junior Developer, or you could take a deep-dive with one of our advanced courses 🚀

- [Our courses](https://scrimba.com/allcourses)
- [The Frontend Career Path](https://scrimba.com/learn/frontend)

Happy Coding!
