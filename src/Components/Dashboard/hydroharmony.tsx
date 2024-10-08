import React from 'react';
import { motion } from 'framer-motion';
import ParticlesBackground from '../ParticlesBackground';

const GreenFodderIntro: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <ParticlesBackground />
      {/* Sección Introductoria */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-green-700">
          Introducción al Foraje Verde Hidropónico
        </h1>
        <p className="text-lg text-gray-700">
          El forraje verde hidropónico (FVH) es una técnica innovadora que permite cultivar forraje nutritivo para el ganado sin la necesidad de suelo. Utilizando un sistema de agua enriquecida con nutrientes, esta metodología proporciona una fuente abundante y sostenible de alimento, optimizando el uso de recursos hídricos y reduciendo el impacto ambiental asociado a la agricultura tradicional.
        </p>
      </div>

      {/* Imagen Principal */}
      <div className="flex justify-center mb-8">
        <motion.img
          src="https://th.bing.com/th/id/R.e318bbbf735281fb19619fe14e735b2d?rik=AsU7ZFHB%2fLC17w&pid=ImgRaw&r=0"
          alt="Cultivo de Foraje Verde Hidropónico"
          className="w-full md:w-3/4 lg:w-2/3 rounded-lg shadow-lg border-2 border-green-300"
          initial={{ scale: 1 }}
          animate={{
            y: [0, -10, 0, 10, 0],
            transition: {
              duration: 3,
              ease: 'easeInOut',
              repeat: Infinity,
            }
          }}
        />
      </div>

      {/* Más Información */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-6 text-green-700">
          ¿Por qué elegir el Foraje Verde Hidropónico?
        </h2>
        <p className="text-lg mb-4 text-gray-700">
          El FVH no solo es eficiente en términos de recursos, sino que también es altamente nutritivo. Este método de cultivo permite a los agricultores producir forraje de calidad en cualquier entorno, incluso en áreas con suelo pobre o condiciones climáticas desfavorables.
        </p>
        <p className="text-lg mb-4 text-gray-700">
          Además, el uso de técnicas de cultivo sin suelo elimina la dependencia de agroquímicos, haciendo del FVH una opción más saludable tanto para los animales como para los consumidores finales.
        </p>
        <p className="text-lg text-gray-700">
          Con la implementación de tecnologías avanzadas, los productores pueden controlar y optimizar todos los aspectos del crecimiento del forraje, desde el riego hasta la iluminación, asegurando una producción constante y de alta calidad.
        </p>
      </div>

      {/* Imágenes Adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[
          'https://hidrosystems.org/wp-content/uploads/2022/01/forrajev.jpg',
          'https://homkin.ru/wp-content/uploads/2018/07/pig105.jpg',
          'https://th.bing.com/th/id/OIP.2V68zZ2GI3WOGxVv1h-P3wHaEO?rs=1&pid=ImgDetMain'
        ].map((src, index) => (
          <div className="flex justify-center" key={index}>
            <motion.img
              src={src}
              alt={`Cultivo de Foraje Verde ${index + 1}`}
              className="w-full h-auto rounded-lg shadow-md border-2 border-green-300"
              initial={{ scale: 1 }}
              animate={{
                y: [0, -10, 0, 10, 0],
                transition: {
                  duration: 3,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }
              }}
            />
          </div>
        ))}
      </div>

      {/* Implementación y Beneficios del IoT en el FVH */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-6 text-green-700">
          Implementación del IoT en el Cultivo de FVH
        </h2>
        <p className="text-lg mb-4 text-gray-700">
          La implementación del Internet de las Cosas (IoT) en el cultivo de Foraje Verde Hidropónico transforma la manera en que los productores manejan sus cultivos. Al integrar sensores y dispositivos conectados, es posible monitorizar en tiempo real factores críticos como la humedad, temperatura y calidad del agua. Estos datos se pueden analizar para optimizar el uso de recursos y mejorar la producción. La automatización del riego y la alimentación de nutrientes garantiza que las plantas reciban exactamente lo que necesitan, lo que no solo aumenta la eficiencia, sino que también reduce el desperdicio y maximiza el rendimiento. Al final, esta tecnología no solo impulsa la producción agrícola, sino que también contribuye a un enfoque más sostenible y responsable en la agricultura moderna.
        </p>

        {/* Contenedor para centrar la imagen */}
        <div className="flex justify-center mb-12">
          <motion.img
            src="https://th.bing.com/th/id/OIP.Ta9y6G58iBfriS0l2du3QAHaHa?w=900&h=900&rs=1&pid=ImgDetMain" // Reemplaza con la URL de tu imagen
            alt="Implementación del IoT en FVH"
            className="w-full md:w-1/2 lg:w-1/3 rounded-lg shadow-lg border-2 border-green-300"
            initial={{ scale: 1 }}
            animate={{
              y: [0, -10, 0, 10, 0],
              transition: {
                duration: 3,
                ease: 'easeInOut',
                repeat: Infinity,
              }
            }}
          />
        </div>
      </div>


      {/* Beneficios del IoT */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-6 text-green-700">
          Beneficios del Internet de las Cosas en el Cultivo
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-700 mx-auto md:w-2/3 lg:w-1/2">
          <li className="mb-2">Monitoreo en tiempo real de las condiciones ambientales.</li>
          <li className="mb-2">Optimización del uso del agua con riego automatizado.</li>
          <li className="mb-2">Mayor eficiencia en la producción de foraje con menos recursos.</li>
          <li className="mb-2">Control de plagas y enfermedades a través de análisis de datos.</li>
          <li className="mb-2">Aumento en la rentabilidad mediante la reducción de costos operativos.</li><br></br>
        </ul>

        {/* Imágenes de Beneficios del IoT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            'https://th.bing.com/th/id/R.44437bced503ea006b5d8100e8ac1bfb?rik=XjRydcyjiJqJLw&riu=http%3a%2f%2fwww.ioiautomation.com%2fassets%2fimages%2fag1-2.jpg&ehk=Z7Mh%2b0YnEIbOEYeyKM3Vktg%2fL0WBWHe7d%2f%2bkkchWFWE%3d&risl=&pid=ImgRaw&r=0',
            'https://th.bing.com/th/id/OIP.kLGBf5LuQDDmQc6wWQ0DZgHaEi?rs=1&pid=ImgDetMain',
            'https://www.paradavisual.com/wp-content/uploads/2021/05/Que-es-una-plataforma-de-gestion-de-conectividad-de-IoT-y-por-que-necesita-una-u-1024x656.jpg'
          ].map((src, index) => (
            <div className="flex justify-center" key={index}>
              <motion.img
                src={src}
                alt={`Beneficio del IoT ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-md border-2 border-green-300"
                initial={{ scale: 1 }}
                animate={{
                  y: [0, -10, 0, 10, 0],
                  transition: {
                    duration: 3,
                    ease: 'easeInOut',
                    repeat: Infinity,
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GreenFodderIntro;
