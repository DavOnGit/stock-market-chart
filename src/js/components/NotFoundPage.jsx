import React from 'react'
import { Card, CardTitle } from 'material-ui/Card'

const NotFoundPage = () => (
  <Card className='container'>
    <CardTitle title='404' subtitle='Requested resurce not found sorry!' />
  </Card>
)

export default NotFoundPage
