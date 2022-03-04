The idea of this project is to show a simple example on how to integrate winston with AWS Lambda and AWS CloudWatch.

Winston, among other libraries, provide us with a set of tools to make logs more usefull and accessible

The topics I took into consideration when building this project were:

Pricing:
a- limit what is logged depending on the API's stage by setting the level of the logger accordingly
b- set a retention log in serverless.yml to dump any log older than a few days, thereby reducing the storing cost of the project

Usability:
a-Add the request ID and level to every log, making them easier to search and filter.