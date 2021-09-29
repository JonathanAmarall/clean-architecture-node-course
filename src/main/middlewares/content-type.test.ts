import app from '../config/app';
import request from 'supertest';

describe('Content Type middleware', () => {
  test('should return default Content-Type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('');
    });
    await request(app).get('/test_content_type').expect('content-type', /json/);
  });

  test('should return Xml  Content-Type when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml');
      res.send('');
    });
    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/);
  });
});
