import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const getSwaggerConfig = (app: INestApplication) => {
	const swaggerConfig = new DocumentBuilder()
		.setTitle('SkillUp API')
		.setDescription('API for SkillUp')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	const document = () => SwaggerModule.createDocument(app, swaggerConfig);

	SwaggerModule.setup('api', app, document);
};
