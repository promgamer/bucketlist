var React = require('react');

var IndexComponent = React.createClass({
	render: function() {
		return (
			
				<html>
				<head>					
					<title> {this.props.titleName} </title>
					<link rel="stylesheet" type="text/css" href="/public/css/main.css"/>
				</head>
				<body>
					<h1> Pagina About. Bem vindo {this.props.name} </h1>					
				</body>
			</html>
			
		)
	}
});

module.exports = IndexComponent;
