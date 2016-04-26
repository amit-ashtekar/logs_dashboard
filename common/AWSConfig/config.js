/**
 * Created by amita on 4/22/2016.
 */


export let logEventsConfig = {
    logGroupName: 'US-QA', /* required */
    logStreamName: 'tomcat', /* required */

    limit: 200,
    nextToken: null,
    startFromHead: true || false,
    startTime: 0
};




