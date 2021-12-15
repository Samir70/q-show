# q-show

This is intended as an npm package so that I can re-use the components which display questions. If you take a look at [qShow](https://github.com/Samir70/qShow) (no hyphen) you can see the components I wrote some time ago. They weren't SFCs, with a .vue extension. Much harder to re-use in a different project. So: I am doing it properly now! 

If you clone the github repo, you can run my development version where I test the components.

> npm run dev

Then go to localhost:3000/ to see the page. 

## installing the npm package

> npm install q-show

Then in, say, app.vue you need to include

```
// in setup:
import { ClassifyQ, MatchQ, MultipleChoiceQ, ShortAnswerQ, SortQ, dummyQs } from 'q-show'
// those are the only things available at the moment

// in style
@import '../node_modules/q-show/dist/style.css'
// or you can make your own stylesheet, maybe take a look at the source in the github repo to see what needs to be accounted for
// I don't recommend it, since the styles used are scoped to each component and there is some re-using of ids
// If there is demand, I can change the ids to make them unique
```
Of course: you could just copy and paste individual SFCs from the github repo. Then you could adapt the component to your own needs. But if you have ideas for how to display questions, why not open an issue here? Then this repo could grow and improve with other people's ideas.

## using the MultipleChoiceQ component

The component needs a qData prop. Bind that to an object. DummyQs is a good source for the format of these objects. In version 2.0.0, the question and answer properties of many types of questions were changed to just use q and a. This matches my other project: [math-q-factory](https://github.com/Samir70/math-q-factory), which currently makes shortAnswer questions but is due for an upgrade!
```
{
    qType: 'multiChoice', q: 'What do you call the longest chord in a circle?',
    a: 'diameter', wrongOptions: ['radius', 'tangent', 'line'],
    // feedback is optional
    feedback: 'The longest chord of a circle is called the diameter.' 
}
```
And the 'html' for the page will look like:
```
MultipleChoiceQ v-bind:qData="currentQ" v-on:user-answered="respondToAns" />
```
As you can see, the component will handle getting an answer from the user and emit an action passing an object to the method 'respondToAns' which you have to write yourself! (So you can change the name, if you prefer!). You can see my example in the github repo for how I handled user answers. It's in src/App.vue

The object passed to this method will look like:

```
{ userWasCorrect: true }
```
This lets you react to whether the user was right or wrong by, eg: updating a score. 

You can handle anything else to do with the question (like hints or feedback) outside of the q-show component.

In version 3, the q-show components emit a user-answered action when the user has finished answering. Version 2 emitted the action when the user asked for a new question. That request now needs to be handled by your own app.

## Dynamic Components
Again: this is demonstrated in App.vue in the github repo. I set up an object with the possible qTypes as keys and the components as values:
```
const qTypes = {
  classify: ClassifyQ,
  match: MatchQ,
  multiChoice: MultipleChoiceQ,
  shortAnswer: ShortAnswer,
  sort: SortQ
}```
Then I can use Vue's component element and bind the "is" property. 

Remembering that your question is an object with a qType property (see above), this can be coded as:
```
component v-bind:is="qTypes[currentQ.qType]" v-bind:qData="currentQ" v-on:user-answered="respondToAns"  />
```
