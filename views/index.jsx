var React = require('react');


var IndexComponent = React.createClass({
	goToAbout: function (event){
		//this.trasitionTo("/about", null, {name: "Joao Pinto"});
		console.log("cenas");
	},

	render: function() {		
		console.log(this);
		return (
			
				<html>
				<head>					
					<title> {this.props.titleName} </title>
					<link rel="stylesheet" type="text/css" href="/public/css/main.css"/>
				</head>
				<body>
					<h1> Bucket List </h1>
					<input type="button" onClick={this.goToAbout} value="Click Me!" />

				</body>
			</html>
			
		);a
	}

	
});



module.exports = IndexComponent;
