const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../api').api
const expect = chai.expect

chai.use(chaiHttp)
chai.should()

describe('Login & Register', () => {
	
	it('should login have status 400 with an invalid affiliate', (done) => {
		chai.request(app)
			.post('/auth/login')
			.send({
				idn: 0303456,
				password: 'la-la-la-lalala',
				role: 'affiliate',
			})
			.end((err, res) => {
				res.should.have.status(400)
				done()
			})
	})

	it('should login have the error message "DNI y/o password incorrecto"', (done) => {
		chai.request(app)
			.post('/auth/login')
			.send({
				idn: 0303456,
				password: 'la-la-la-lalala',
				role: 'affiliate',
			})
			.end((err, res) => {
				expect(res.body).to.have.property('error').to.be.equal('DNI y/o password incorrecto')
				done()
			})
	})

	it('should register can register a user', done => {
		chai.request(app)
			.post('/auth/register')
			.send({
				'info': {
					'firstname': 'Hello',
					'lastname': 'World',
					'birthdate': '1900-01-01',
					'affiliate_id': '111',
					'idn': 12345678,
					'email': 'hello.world@example.com', 
					'password': 'asdf1234'
				},
				'role': 'affiliate'
			})
			.end((err, res) => {
				res.should.have.status(200)
				done()
			})
	})

	it('try to login after register', done => {
		chai.request(app)
			.post('/auth/login')
			.send({
				idn: 12345678,
				password: 'asdf1234',
				role: 'affiliate'
			})
			.end((err, res) => {
				res.should.have.status(200)
				expect(res.body).to.have.property('user').to.have.property('firstname').to.be.equal('Hello')
				expect(res.body).to.have.property('user').to.have.property('lastname').to.be.equal('World')
				expect(res.body).to.have.property('user').to.have.property('birthdate').to.be.equal('1900-01-01')
				expect(res.body).to.have.property('user').to.have.property('affiliate_id').to.be.equal('111')
				expect(res.body).to.have.property('user').to.have.property('idn').to.be.equal(12345678)
				expect(res.body).to.have.property('user').to.have.property('email').to.be.equal('hello.world@example.com')
				expect(res.body).to.have.property('token')
				done()
			})
	})

	it('try to login with invalid pass after register', done => {
		chai.request(app)
			.post('/auth/login')
			.send({
				idn: 12345678,
				password: 'asdf4321',
				role: 'affiliate'
			})
			.end((err, res) => {
				res.should.have.status(400)
				expect(res.body).to.have.property('error').to.be.equal('DNI y/o password incorrecto')
				done()
			})
	})
})
