import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconButton from './IconButton';
import { format, parse, isValid } from 'date-fns';
import { es } from 'date-fns/locale';

const { width: screenWidth } = Dimensions.get('screen');
const { height: screenHeight } = Dimensions.get('screen');

const ClaseAsset = ({ dateString, ICONOELEGIR, FUNCIONALIDAD, terreque }) => {
    let eventDate;
    if (dateString) {
        try {
            eventDate = parse(dateString, 'yyyy/MM/dd HH:mm', new Date());
        } catch (error) {
            console.error("Error al parsear la fecha:", error);
            return <Text>Error en la fecha</Text>;
        }
    } else {
        console.warn("dateString no es válido o no es una cadena");
        return <Text>Fecha no disponible</Text>;
    }

    // Check if the eventDate is valid
    if (!isValid(eventDate)) {
        console.error("Fecha no válida:", dateString);
        return <Text>Fecha no válida</Text>;
    }

    const LEERMAS = () => {

    }

    // Format the event date
    const eventDatePosta = format(eventDate, 'dd/MM/yyyy HH:mm');

    // Get the day and the start time
    const dia = format(eventDate, 'd');
    const diaDeLaSemana = format(eventDate, 'eee', { locale: es });
    const horaInicio = format(eventDate, 'HH:mm', { locale: es });

    // Calculate end time by adding one hour to the original event date
    const eventDateFin = new Date(eventDate);
    eventDateFin.setHours(eventDateFin.getHours() + 1);
    const horaFin = format(eventDateFin, 'HH:mm', { locale: es });

    return (
        <View style={styles.Todo}>
            <View style={styles.diadiasandia}>
                <View><Text style={styles.nochenochefantoche}>{dia}</Text></View>
                <View><Text style={styles.capitandelespacio}>{diaDeLaSemana}</Text></View>
            </View>
            <View style={{ alignContent: 'center', alignItems: 'center' }}>
                <View style={styles.aquellanochelocadelosmiltequilas}>
                    <Text style={styles.maramarombai}>{horaInicio} a {horaFin}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={terreque}>
                        <Text style={styles.leermas}>Leer Más</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.parapra}>
                <IconButton name={ICONOELEGIR} onPress={FUNCIONALIDAD} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Todo: {
        backgroundColor: '#009BDE',
        width: screenWidth * 0.87,
        height: screenHeight * 0.11,
        borderRadius: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    diadiasandia: {
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nochenochefantoche: {
        fontSize: screenWidth * 0.11, // Adaptable a la pantalla
        color: '#000',
        fontWeight: '500',
    },
    capitandelespacio: {
        fontSize: screenWidth * 0.06,
        color: '#000',
        marginBottom: 10,
        marginTop: -15,
        fontWeight: '900',
    },
    aquellanochelocadelosmiltequilas: {
        backgroundColor: '#007BB0',
        borderRadius: 20,
        width: screenWidth * 0.45,
        marginTop: 20,
        marginBottom: 15,
    },
    maramarombai: {
        fontSize: screenWidth * 0.04, // Ajuste adaptativo
        color: '#fff',
        textAlign: 'center',
        fontWeight: '400',
    },
    leermas: {
        fontSize: screenWidth*0.04,
        color: '#555',
        fontWeight: '800',
        textAlign: 'center',
    },
    parapra: {
        justifyContent: 'center',
        alignItems: 'center', // Center icon
        marginRight: 10,
    },
});


export default ClaseAsset;
