/**
 * Created by amita on 4/22/2016.
 */


export let logEventsConfig = {
    logGroupName: 'US-QA', /* required */
    logStreamName: 'tomcat', /* required */

    limit: 4,
    nextToken: null,
    startFromHead: true || false,
    startTime: 0
};


export let filterLogEventsParams = {
    logGroupName: 'US-QA', /* required */
    filterPattern: '',


    interleaved: true || false,
    limit: 3,
    logStreamNames: [
        'tomcat'

    ],
    nextToken:null

};

