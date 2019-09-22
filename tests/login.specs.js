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
				idn: 303456,
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
				idn: 303456,
				password: 'la-la-la-lalala',
				role: 'affiliate',
			})
			.end((err, res) => {
				expect(res.body).to.have.property('error').to.be.equal('DNI y/o password incorrecto')
				done()
			})
	})

	it('should register an affiliated user', done => {
		chai.request(app)
			.post('/auth/register')
			.send({
				'info': {
					'firstname': 'Martin',
					'lastname': 'Garcia',
					'birthdate': '1900-07-21',
					'affiliate_id': '0987654321',
					'idn': 34317677,
					'plan': 'A310',
					'email': 'mennitise@gmail.com',
					'password': 'asdf1234'
				},
				'role': 'affiliate'
			})
			.end((err, res) => {
				res.should.have.status(200)
				expect(res.body).to.have.property('message').to.be.equal('Registro exitoso')
				done()
			})
	})

	it('should not register an invalid affiliated user', done => {
		chai.request(app)
			.post('/auth/register')
			.send({
				'info': {
					'firstname': 'Juan',
					'lastname': 'Perez',
					'birthdate': '1900-07-21',
					'affiliate_id': '0303456',
					'idn': 303456,
					'plan': 'A310',
					'email': 'mennitise@gmail.com',
					'password': '121212'
				},
				'role': 'affiliate'
			})
			.end((err, res) => {
				res.should.have.status(400)
				expect(res.body).to.have.property('error').to.be.equal('Hubo un error al registrarte > Usted no es un afiliado autorizado')
				done()
			})
	})

	it('try to login after register', done => {
		chai.request(app)
			.post('/auth/login')
			.send({
				idn: 34317677,
				password: 'asdf1234',
				role: 'affiliate'
			})
			.end((err, res) => {
				res.should.have.status(200)
				expect(res.body).to.have.property('user').to.have.property('firstname').to.be.equal('Martin')
				expect(res.body).to.have.property('user').to.have.property('lastname').to.be.equal('Garcia')
				expect(res.body).to.have.property('user').to.have.property('birthdate').to.be.equal('1900-07-21')
				expect(res.body).to.have.property('user').to.have.property('affiliate_id').to.be.equal('0987654321')
				expect(res.body).to.have.property('user').to.have.property('idn').to.be.equal(34317677)
				expect(res.body).to.have.property('user').to.have.property('email').to.be.equal('mennitise@gmail.com')
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
